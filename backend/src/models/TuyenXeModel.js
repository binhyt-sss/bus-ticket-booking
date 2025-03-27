const pool = require('../utils/connectDB');

const getAllTuyenXe = async () => {
    const [rows] = await pool.query('SELECT * FROM TUYENXE');
    return rows;
};

const getAllDiemDi = async () => {
    const [rows] = await pool.query('SELECT DISTINCT DIEMDI FROM TUYENXE');
    return rows;
};

const getAllDiemDen = async () => {
    const [rows] = await pool.query('SELECT DISTINCT DIEMDEN FROM TUYENXE');
    return rows;
};


const getTuyenXeById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM TUYENXE WHERE MATUYEN = ?', [id]);
    return rows.length > 0 ? rows[0] : null;
};

const createTuyenXe = async (newTuyenXe) => {
    const {TENTUYEN, DIEMDI, DIEMDEN, BANGGIA, MAXE } = newTuyenXe;
    const [result] = await pool.query(
        'INSERT INTO TUYENXE (TENTUYEN, DIEMDI, DIEMDEN, BANGGIA, MAXE) VALUES ( ?, ?, ?, ?, ?)',
        [TENTUYEN, DIEMDI, DIEMDEN, BANGGIA, MAXE]
    );
    return result;
};

const updateTuyenXe = async (id, updatedData) => {
    const { TENTUYEN, DIEMDI, DIEMDEN, BANGGIA, MAXE } = updatedData;
    const [result] = await pool.query(
        'UPDATE TUYENXE SET TENTUYEN = ?, DIEMDI = ?, DIEMDEN = ?, BANGGIA = ?, MAXE = ? WHERE MATUYEN = ?',
        [TENTUYEN, DIEMDI, DIEMDEN, BANGGIA, MAXE, id]
    );
    return result;
};

const deleteTuyenXe = async (id) => {
    const [result] = await pool.query('DELETE FROM TUYENXE WHERE MATUYEN = ?', [id]);
    return result;
};

module.exports = {
    getAllTuyenXe,
    getTuyenXeById,
    createTuyenXe,
    updateTuyenXe,
    deleteTuyenXe,
    getAllDiemDen,
    getAllDiemDi
};
