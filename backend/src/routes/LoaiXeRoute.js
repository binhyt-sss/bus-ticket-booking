const express = require('express');
const router = express.Router();
const loaiXeController = require('../controllers/LoaiXeController');

router.get('/', loaiXeController.getAllLoaiXe);
router.get('/:maloaixe', loaiXeController.getLoaiXeById);
router.post('/create', loaiXeController.createLoaiXe);
router.post('/update/:maloaixe', loaiXeController.updateLoaiXe);
router.delete('/delete/:maloaixe', loaiXeController.deleteLoaiXe);

module.exports = router;
