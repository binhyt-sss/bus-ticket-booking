const express = require('express');
const router = express.Router();
const chiTietVeController = require('../controllers/ChiTietVeController');
/** ===========================
 *  ROUTES CHO CHI TIẾT VÉ (CHITIETVE)
 *  =========================== */
router.get('/', chiTietVeController.getAllChiTietVe);
router.post('/create', chiTietVeController.createChiTietVe);
router.get('/:mactve', chiTietVeController.getChiTietVeById);
router.post('/update/:mactve', chiTietVeController.updateChiTietVe);
router.delete('/delete/:mactve', chiTietVeController.deleteChiTietVe);

module.exports = router;