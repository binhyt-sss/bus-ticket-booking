const pool = require('../utils/connectDB');

const getAllVe = async () => {
    const [rows] = await pool.query('SELECT * FROM VE');
    return rows;
};

const getVeById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM VE WHERE MAVE = ?', [id]);
    return rows.length > 0 ? rows[0] : null;
};

const createVe = async (newVe) => {
    const { MACHUYENXE } = newVe;
    const [result] = await pool.query(
        'INSERT INTO VE ( MACHUYENXE) VALUES (?)',
        [  MACHUYENXE]
    );
    return result;
};
const createVeVaChiTiet = async (newVe) => {
    const connection = await pool.getConnection(); // Lấy kết nối để thực hiện transaction

    try {
        await connection.beginTransaction(); // Bắt đầu transaction

        const { MAXE, SOGHE, NGAYDATVE, GHICHU, TENKH, EMAIL, SODT, CMND, GIAVE } = newVe;

        // Kiểm tra dữ liệu đầu vào
        if (!MAXE || !Array.isArray(SOGHE) || SOGHE.length === 0 || !GIAVE) {
            throw new Error("Dữ liệu đầu vào không hợp lệ!");
        }

        // 🔎 1️⃣ Tìm khách hàng
        const [khachHangResult] = await connection.query(
            "SELECT MAKH FROM KHACHHANG WHERE EMAIL = ? OR CMND = ? OR SODT = ? LIMIT 1",
            [EMAIL, CMND, SODT]
        );
        if (khachHangResult.length === 0) {
            throw new Error("Không tìm thấy khách hàng!");
        }
        const { MAKH } = khachHangResult[0];

        // 🔎 2️⃣ Tìm chuyến xe
        const [chuyenXeResult] = await connection.query(
            "SELECT MACHUYENXE FROM CHUYENXE WHERE MAXE = ? LIMIT 1",
            [MAXE]
        );
        if (chuyenXeResult.length === 0) {
            throw new Error("Không tìm thấy chuyến xe!");
        }
        const { MACHUYENXE } = chuyenXeResult[0];

        // 🔎 3️⃣ Kiểm tra trùng ghế trên chuyến xe này
        const [trungGheResult] = await connection.query(
            "SELECT SOGHE FROM CHITIETVE WHERE MAVE IN (SELECT MAVE FROM VE WHERE MACHUYENXE = ?) AND SOGHE IN (?)",
            [MACHUYENXE, SOGHE.join(", ")]
        );
        if (trungGheResult.length > 0) {
            throw new Error("Ghế đã được đặt, vui lòng chọn ghế khác!");
        }

        // 📝 4️⃣ Thêm vé vào bảng VE
        const [veResult] = await connection.query(
            "INSERT INTO VE (MACHUYENXE) VALUES (?)",
            [MACHUYENXE]
        );
        const MAVE = veResult.insertId;

        // 📝 5️⃣ Thêm chi tiết vé
        const THANHTIEN = GIAVE * SOGHE.length;
        const SOGHENGOI = SOGHE.length;

        await connection.query(
            "INSERT INTO CHITIETVE (MAVE, MAKH, THANHTIEN, SOGHENGOI, NGAYDATVE, GHICHU, SOGHE) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [MAVE, MAKH, THANHTIEN, SOGHENGOI, NGAYDATVE, GHICHU, SOGHE.join(", ")]
        );

        await connection.commit(); // Hoàn thành transaction

        console.log("MAKH:", MAKH);
        console.log("MAVE:", MAVE);
        return {
            success: true,
            message: "Thêm vé và chi tiết vé thành công!",
            ve: { MAVE, MACHUYENXE },
            chiTietVe: { MAVE, MAKH, THANHTIEN, SOGHENGOI, NGAYDATVE, GHICHU, SOGHE }
        };
    } catch (error) {
        await connection.rollback(); // Quay lại trạng thái trước khi xảy ra lỗi
        console.error("Lỗi khi tạo vé và chi tiết vé:", error);
        return { success: false, message: error.message };
    } finally {
        connection.release(); // Giải phóng kết nối
    }
};

const updateVe = async (id, updatedData) => {
    const {  MACHUYENXE } = updatedData;
    const [result] = await pool.query(
        'UPDATE VE SET MACHUYENXE = ? WHERE MAVE = ?',
        [MACHUYENXE, id]
    );
    return result;
};

const deleteVe = async (id) => {
    const [result] = await pool.query('DELETE FROM VE WHERE MAVE = ?', [id]);
    return result;
};

module.exports = {
    getAllVe,
    getVeById,
    createVe,
    updateVe,
    deleteVe,
    createVeVaChiTiet
};
