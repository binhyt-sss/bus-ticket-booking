const pool = require('../utils/connectDB');

const getAllNhanVien = async () => {
    const [rows] = await pool.query('SELECT * FROM NVBANVE');
    return rows;
};

const getNhanVienById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM NVBANVE WHERE MANV = ?', [id]);
    return rows.length > 0 ? rows[0] : null;
};

const createNhanVien = async (newNhanVien) => {
    const { TENNV, MATOCHUC, GIOITINH, DIACHI, SODT, CMND, EMAIL, MAQUYEN } = newNhanVien;
    const [result] = await pool.query(
        'INSERT INTO NVBANVE (TENNV, MATOCHUC, GIOITINH, DIACHI, SODT, CMND, EMAIL, MAQUYEN) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [TENNV, MATOCHUC, GIOITINH, DIACHI, SODT, CMND, EMAIL, MAQUYEN]
    );
    return result;
};

const updateNhanVien = async (id, updatedData) => {
    const { TENNV, MATOCHUC, GIOITINH, DIACHI, SODT, CMND, EMAIL, MAQUYEN } = updatedData;
    const [result] = await pool.query(
        'UPDATE NVBANVE SET TENNV = ?, MATOCHUC = ?, GIOITINH = ?, DIACHI = ?, SODT = ?, CMND = ?, EMAIL = ?, MAQUYEN = ? WHERE MANV = ?',
        [TENNV, MATOCHUC, GIOITINH, DIACHI, SODT, CMND, EMAIL, MAQUYEN, id]
    );
    return result;
};

const deleteNhanVien = async (id) => {
    const [result] = await pool.query('DELETE FROM NVBANVE WHERE MANV = ?', [id]);
    return result;
};

module.exports = {
    getAllNhanVien,
    getNhanVienById,
    createNhanVien,
    updateNhanVien,
    deleteNhanVien
};
