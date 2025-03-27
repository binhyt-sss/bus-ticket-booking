const express = require('express');
const router = express.Router();
const chuyenXeController = require('../controllers/ChuyenXeController');
/** ===========================
 *  ROUTES CHO CHUYẾN XE (CHUYENXE)
 *  =========================== */
router.get('/chuyenxe', chuyenXeController.getAllChuyenXe);
router.get('/getMaxeByTenxe', chuyenXeController.getMaxeByTenxeController);
router.post('/chuyenxe/create', chuyenXeController.createChuyenXe);
router.get('/:machuyenxe', chuyenXeController.getChuyenXeById);
router.post('/chuyenxe/update/:machuyenxe', chuyenXeController.updateChuyenXe);
router.delete('/chuyenxe/delete/:machuyenxe', chuyenXeController.deleteChuyenXe);

module.exports = router;