const express = require('express');
const router = express.Router();
const tuyenXeController = require('../controllers/TuyenXeController');

router.get('/', tuyenXeController.getAllTuyenXe);
router.get('/diemdi', tuyenXeController.getAllDiemDi);
router.get('/diemden', tuyenXeController.getAllDiemDen);
router.get('/:matuyen', tuyenXeController.getTuyenXeById);
router.post('/create', tuyenXeController.createTuyenXe);
router.post('/update/:matuyen', tuyenXeController.updateTuyenXe);
router.delete('/delete/:matuyen', tuyenXeController.deleteTuyenXe);

module.exports = router;
