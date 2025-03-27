const pool = require('../utils/connectDB');
const bcrypt = require('bcrypt');

const getAll = async () => {
    const query = 'SELECT * FROM TAIKHOAN';
    const [rows, fields] = await pool.query(query);
    return rows;
}

const create = async (newUser) => {
    const { username, password, maquyen } = newUser;
    const newpassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO TAIKHOAN (USERNAME, PASSWORD, MAQUYEN) VALUES (?, ?, ?)';
    const [rows, fields] = await pool.query(query, [username, newpassword, maquyen]);
    return rows;
}

const checkUser = async (username) => {
    const query = 'SELECT * FROM TAIKHOAN WHERE USERNAME = ?';
    const [rows, fields] = await pool.query(query, [username]);
    return rows;
}

const updateUser = async (id,username, password, maquyen) => {
    const newpassword = await bcrypt.hash(password, 10);
    const query = 'UPDATE TAIKHOAN SET USERNAME = ?,PASSWORD = ?, MAQUYEN = ? WHERE ID = ?';
    const [rows, fields] = await pool.query(query, [username, newpassword, maquyen, id]);
    return rows;
}

const kichhoatUser = async (id, maquyen) => {
    const newpassword = await bcrypt.hash(password, 10);
    const query = 'UPDATE TAIKHOAN SET  MAQUYEN = 1  WHERE ID = ?'; 
    const [rows, fields] = await pool.query(query, [maquyen, id]);
    return rows;
}

const huykichhoatUser = async (id, maquyen) => {
    const newpassword = await bcrypt.hash(password, 10);
    const query = 'UPDATE TAIKHOAN SET  MAQUYEN = 3  WHERE ID = ?'; 
    const [rows, fields] = await pool.query(query, [maquyen, id]);
    return rows;
}

const deleteUser = async (id) => {
    const query = 'DELETE FROM TAIKHOAN WHERE ID = ?';
    const [rows, fields] = await pool.query(query, [id]);
    return rows;
}
const getUserById = async (id) => {
    const query = 'SELECT * FROM TAIKHOAN WHERE ID = ?';
    const [rows, fields] = await pool.query(query, [id]);
    return rows.length > 0 ? rows[0] : null;
};

module.exports = {
    getAll,
    create,
    checkUser,
    updateUser,
    deleteUser,
    getUserById,
    kichhoatUser,
    huykichhoatUser
};
