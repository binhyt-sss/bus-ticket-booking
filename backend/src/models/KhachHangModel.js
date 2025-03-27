const pool = require('../utils/connectDB');

const getAllKhachHang = async () => {
    const [rows] = await pool.query('SELECT * FROM KHACHHANG');
    return rows;
};

const getKhachHangById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM KHACHHANG WHERE MAKH = ?', [id]);
    return rows.length > 0 ? rows[0] : null;
};

const createKhachHang = async (newKhachHang) => {
    const { TENKH, NGAYSINH, GIOITINH, DIACHI, SODT, CMND, EMAIL } = newKhachHang;
    const [result] = await pool.query(
        'INSERT INTO KHACHHANG (TENKH, NGAYSINH, GIOITINH, DIACHI, SODT, CMND, EMAIL) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [TENKH, NGAYSINH, GIOITINH, DIACHI, SODT, CMND, EMAIL]
    );
    return result;
};

const updateKhachHang = async (id, updatedData) => {
    const { TENKH, NGAYSINH, GIOITINH, DIACHI, SODT, CMND, EMAIL } = updatedData;
    const [result] = await pool.query(
        'UPDATE KHACHHANG SET TENKH = ?, NGAYSINH = ?, GIOITINH = ?, DIACHI = ?, SODT = ?, CMND = ?, EMAIL = ? WHERE MAKH = ?',
        [TENKH, NGAYSINH, GIOITINH, DIACHI, SODT, CMND, EMAIL, id]
    );
    return result;
};

const deleteKhachHang = async (id) => {
    const [result] = await pool.query('DELETE FROM KHACHHANG WHERE MAKH = ?', [id]);
    return result;
};

module.exports = {
    getAllKhachHang,
    getKhachHangById,
    createKhachHang,
    updateKhachHang,
    deleteKhachHang
};
