const pool = require('../utils/connectDB');

const getAllChiTietVe = async () => {
    const [rows] = await pool.query('SELECT * FROM CHITIETVE');
    return rows;
};

const getChiTietVeById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM CHITIETVE WHERE MACTVE = ?', [id]);
    return rows.length > 0 ? rows[0] : null;
};

const createChiTietVe = async (newChiTietVe) => {
    const { MAVE, MAKH, THANHTIEN, SOGHENGOI, NGAYDATVE, GHICHU, SOGHE } = newChiTietVe;
    const [result] = await pool.query(
        'INSERT INTO CHITIETVE (MAVE, MAKH, THANHTIEN, SOGHENGOI, NGAYDATVE, GHICHU, SOGHE) VALUES (?, ?, ?, ?, ?, ?,?)',
        [MAVE, MAKH, THANHTIEN, SOGHENGOI, NGAYDATVE, GHICHU, SOGHE]
    );
    return result;
};

const updateChiTietVe = async (id, updatedData) => {
    const { MAVE, MAKH, THANHTIEN, SOGHENGOI, NGAYDATVE, GHICHU, SOGHE  } = updatedData;
    const [result] = await pool.query(
        'UPDATE CHITIETVE SET MAVE = ?, MAKH = ?, THANHTIEN = ?, SOGHENGOI = ?, NGAYDATVE = ?, GHICHU = ?,SOGHE=? WHERE MACTVE = ?',
        [MAVE, MAKH, THANHTIEN, SOGHENGOI, NGAYDATVE, GHICHU, SOGHE, id]
    );
    return result;
};

const deleteChiTietVe = async (id) => {
    const [result] = await pool.query('DELETE FROM CHITIETVE WHERE MACTVE = ?', [id]);
    return result;
};

module.exports = {
    getAllChiTietVe,
    getChiTietVeById,
    createChiTietVe,
    updateChiTietVe,
    deleteChiTietVe
};
