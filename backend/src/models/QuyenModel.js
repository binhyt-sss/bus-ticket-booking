const pool = require('../utils/connectDB');

const getAllQuyen = async () => {
    const [rows] = await pool.query('SELECT * FROM QUYEN');
    return rows;
};

const getQuyenById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM QUYEN WHERE MAQUYEN = ?', [id]);
    return rows.length > 0 ? rows[0] : null;
};

const createQuyen = async (newQuyen) => {
    const {  TENQUYEN } = newQuyen;
    const [result] = await pool.query(
        'INSERT INTO QUYEN (TENQUYEN) VALUES (?)',
        [TENQUYEN]
    );
    return result;
};

const updateQuyen = async (id, updatedData) => {
    const { TENQUYEN } = updatedData;
    const [result] = await pool.query(
        'UPDATE QUYEN SET TENQUYEN = ? WHERE MAQUYEN = ?',
        [TENQUYEN, id]
    );
    return result;
};

const deleteQuyen = async (id) => {
    const [result] = await pool.query('DELETE FROM QUYEN WHERE MAQUYEN = ?', [id]);
    return result;
};

module.exports = {
    getAllQuyen,
    getQuyenById,
    createQuyen,
    updateQuyen,
    deleteQuyen
};
