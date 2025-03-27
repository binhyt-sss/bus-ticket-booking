const pool = require('../utils/connectDB');

const getAllChuyenXe = async () => {
    const [rows] = await pool.query('SELECT * FROM CHUYENXE');
    return rows;
};

const getChuyenXeById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM CHUYENXE WHERE MACHUYENXE = ?', [id]);
    return rows.length > 0 ? rows[0] : null;
};
const getMaxeByTenxe = async (tenXe) => {
    try {
        console.log("🔎 Đang truy vấn database với tenXe:", tenXe);
        
        const sql = "SELECT MAXE FROM CHUYENXE WHERE TENXE = ? LIMIT 1";
        const [rows] = await pool.query(sql, [tenXe]);

        console.log("📌 Kết quả truy vấn:", rows);
        return rows.length > 0 ? rows[0].MAXE : null;
    } catch (err) {
        console.error("❌ Lỗi khi truy vấn database:", err);
        throw err;
    }
};


const createChuyenXe = async (newChuyenXe) => {
    const { MATUYEN, NGAYGIOKHOIHANH, GIODEN, GHICHU, MAXE,TENXE } = newChuyenXe;
    const [result] = await pool.query(
        'INSERT INTO CHUYENXE ( MATUYEN, NGAYGIOKHOIHANH, GIODEN, GHICHU, MAXE,TENXE) VALUES (?, ?, ?, ?, ?,?)',
        [MATUYEN, NGAYGIOKHOIHANH, GIODEN, GHICHU, MAXE,TENXE]
    );
    return result;
};

const updateChuyenXe = async (id, updatedData) => {
    const {MATUYEN, NGAYGIOKHOIHANH, GIODEN, GHICHU, MAXE,TENXE } = updatedData;
    const [result] = await pool.query(
        'UPDATE CHUYENXE SET MATUYEN = ?, NGAYGIOKHOIHANH = ?, GIODEN = ?, GHICHU = ?, MAXE = ?,TENXE=? WHERE MACHUYENXE = ?',
        [MATUYEN, NGAYGIOKHOIHANH, GIODEN, GHICHU, MAXE,TENXE, id]
    );
    return result;
};

const deleteChuyenXe = async (id) => {
    const [result] = await pool.query('DELETE FROM CHUYENXE WHERE MACHUYENXE = ?', [id]);
    return result;
};

module.exports = {
    getAllChuyenXe,
    getChuyenXeById,
    getMaxeByTenxe,
    createChuyenXe,
    updateChuyenXe,
    deleteChuyenXe
};
