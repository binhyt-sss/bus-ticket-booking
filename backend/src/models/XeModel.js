const pool = require('../utils/connectDB');

const getAllXe = async () => {
    const [rows] = await pool.query(`
       SELECT XE.*, 
       TUYENXE.DIEMDI, 
       TUYENXE.DIEMDEN, 
       TUYENXE.BANGGIA, 
       LOAIXE.TENLOAIXE
FROM XE 
LEFT JOIN TUYENXE ON XE.MAXE = TUYENXE.MAXE
LEFT JOIN LOAIXE ON XE.MALOAIXE = LOAIXE.MALOAIXE;
    `);
    return rows;
};

const getXeByDiemDiDiemDen = async (diemDi, diemDen) => {
    const query = `
        SELECT XE.*, TUYENXE.DIEMDI, TUYENXE.DIEMDEN, TUYENXE.BANGGIA, LOAIXE.TENLOAIXE
        FROM XE 
        LEFT JOIN TUYENXE ON XE.MAXE = TUYENXE.MAXE
        LEFT JOIN LOAIXE ON XE.MALOAIXE = LOAIXE.MALOAIXE
        WHERE TUYENXE.DIEMDI = ? AND TUYENXE.DIEMDEN = ?;
    `;
    const [rows] = await pool.query(query, [diemDi, diemDen]);
    return rows;
};
const getGheByVe = async () => {
    const sql = `
        SELECT 
            VE.MaVe,
            XE.TenXe,
            CHITIETVE.SoGheNgoi,
            CHITIETVE.SoGhe
        FROM VE
        JOIN CHITIETVE ON VE.MaVe = CHITIETVE.MaVe
        JOIN CHUYENXE ON VE.MaChuyenXe = CHUYENXE.MaChuyenXe
        JOIN XE ON CHUYENXE.MaXe = XE.MaXe
    `;
    const [rows] = await pool.query(sql);
    return rows;
};
const getThongTinXe = async (maxe) => {
    const [rows] = await pool.query(`
        SELECT 
            XE.TENXE, 
            XE.ANHXE, 
            LOAIXE.TENLOAIXE, 
            TAIXE.TENTX, 
            TUYENXE.TENTUYEN, 
            TUYENXE.DIEMDI, 
            TUYENXE.DIEMDEN, 
            TUYENXE.BANGGIA, 
            CHUYENXE.NGAYGIOKHOIHANH, 
            CHUYENXE.GIODEN, 
            CHUYENXE.GHICHU 
        FROM CHUYENXE
        JOIN XE ON CHUYENXE.MAXE = XE.MAXE
        JOIN LOAIXE ON XE.MALOAIXE = LOAIXE.MALOAIXE
        JOIN TAIXE ON XE.MAXE = TAIXE.MAXE
        JOIN TUYENXE ON CHUYENXE.MATUYEN = TUYENXE.MATUYEN
        WHERE XE.MAXE = ?;
    `, [maxe]);
    return rows.length > 0 ? rows[0] : null;
};


const getXeById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM XE WHERE MAXE = ?', [id]);
    return rows.length > 0 ? rows[0] : null;
};

const createXe = async (newXe) => {
    const { MALOAIXE, TENXE } = newXe;
    const [result] = await pool.query(
        'INSERT INTO XE ( MALOAIXE, TENXE) VALUES (?, ?)',
        [ MALOAIXE, TENXE]
    );
    return result;
};

const updateXe = async (id, updatedData) => {
    const { MALOAIXE, TENXE } = updatedData;
    const [result] = await pool.query(
        'UPDATE XE SET MALOAIXE = ?, TENXE = ? WHERE MAXE = ?',
        [MALOAIXE, TENXE, id]
    );
    return result;
};

const deleteXe = async (id) => {
    await pool.query('DELETE FROM TUYENXE WHERE MAXE = ?', [id]);
    const [result] = await pool.query('DELETE FROM XE WHERE MAXE = ?', [id]);
    return result;
};

module.exports = {
    getAllXe,
    getXeByDiemDiDiemDen,
    getThongTinXe,
    getXeById,
    createXe,
    updateXe,
    deleteXe,
    getGheByVe
};
