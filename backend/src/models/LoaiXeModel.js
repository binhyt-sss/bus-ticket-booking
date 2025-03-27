const pool = require('../utils/connectDB');

const getAllLoaiXe = async () => {
    const [rows] = await pool.query('SELECT * FROM LOAIXE');
    return rows;
};

const getLoaiXeById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM LOAIXE WHERE MALOAIXE = ?', [id]);
    return rows.length > 0 ? rows[0] : null;
};

const createLoaiXe = async (newLoaiXe) => {
    const { TENLOAIXE } = newLoaiXe;
    const [result] = await pool.query(
        'INSERT INTO LOAIXE (TENLOAIXE) VALUES ( ?)',
        [TENLOAIXE]
    );
    return result;
};

const updateLoaiXe = async (id, updatedData) => {
    const { TENLOAIXE } = updatedData;
    const [result] = await pool.query(
        'UPDATE LOAIXE SET TENLOAIXE = ? WHERE MALOAIXE = ?',
        [TENLOAIXE, id]
    );
    return result;
};

const deleteLoaiXe = async (id) => {
    const [result] = await pool.query('DELETE FROM LOAIXE WHERE MALOAIXE = ?', [id]);
    return result;
};

module.exports = {
    getAllLoaiXe,
    getLoaiXeById,
    createLoaiXe,
    updateLoaiXe,
    deleteLoaiXe
};
