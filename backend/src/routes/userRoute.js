const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const quyenController = require('../controllers/QuyenController');
const khachHangController = require('../controllers/KhachHangController');
const veController = require('../controllers/VeController');
const chiTietVeController = require('../controllers/ChiTietVeController');
const taiXeController = require('../controllers/TaiXeController');
const xeController = require('../controllers/XeController');
const chuyenXeController = require('../controllers/ChuyenXeController');
const loaiXeController = require('../controllers/LoaiXeController');
const tuyenXeController = require('../controllers/TuyenXeController');


/** ===========================
 *  ROUTES CHO NGƯỜI DÙNG (TÀI KHOẢN)
 *  =========================== */
router.get('/users', userController.getAllUsers);
router.post('/users/create', userController.createUser);
router.post('/users/login', userController.login);
router.post('/kichhoat', userController.kichhoatUser);
router.post('/huykichhoat', userController.huykichhoatUser);
router.post('/users/logout', userController.logout);
router.get('/users/:id', userController.getUserById);
router.post('/users/update/:id', userController.updateUser);
router.delete('/users/delete/:id', userController.deleteUser);


module.exports = router;
