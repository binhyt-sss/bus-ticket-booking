const pool = require('../utils/connectDB');

const getAllTaiXe = async () => {
    const [rows] = await pool.query('SELECT * FROM TAIXE');
    return rows;
};

const getTaiXeById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM TAIXE WHERE MATAIXE = ?', [id]);
    return rows.length > 0 ? rows[0] : null;
};

const createTaiXe = async (newTaiXe) => {
    const { TENTX, NGAYSINH, GIOITINH, DIACHI, SODT, CMND, EMAIL,MAXE } = newTaiXe;
    const [result] = await pool.query(
        'INSERT INTO TAIXE (TENTX, NGAYSINH, GIOITINH, DIACHI, SODT, CMND, EMAIL,MAXE) VALUES ( ?,?, ?, ?, ?, ?, ?, ?)',
        [TENTX, NGAYSINH, GIOITINH, DIACHI, SODT, CMND, EMAIL,MAXE]
    );
    return result;
};

const updateTaiXe = async (id, updatedData) => {
    const { TENTX, NGAYSINH, GIOITINH, DIACHI, SODT, CMND, EMAIL,MAXE } = updatedData;
    const [result] = await pool.query(
        'UPDATE TAIXE SET TENTX = ?, NGAYSINH = ?, GIOITINH = ?, DIACHI = ?, SODT = ?, CMND = ?, EMAIL = ?, MAXE = ? WHERE MATAIXE = ?',
        [TENTX, NGAYSINH, GIOITINH, DIACHI, SODT, CMND, EMAIL,MAXE, id]
    );
    return result;
};

const deleteTaiXe = async (id) => {
    const [result] = await pool.query('DELETE FROM TAIXE WHERE MATAIXE = ?', [id]);
    return result;
};

module.exports = {
    getAllTaiXe,
    getTaiXeById,
    createTaiXe,
    updateTaiXe,
    deleteTaiXe
};
