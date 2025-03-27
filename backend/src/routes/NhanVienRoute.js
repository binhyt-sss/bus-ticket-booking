const express = require('express');
const router = express.Router();
const nhanVienController = require('../controllers/NhanVienController');

router.get('/', nhanVienController.getAllNhanVien);
router.get('/:manv', nhanVienController.getNhanVienById);
router.post('/create', nhanVienController.createNhanVien);
router.post('/update/:manv', nhanVienController.updateNhanVien);
router.delete('/delete/:manv', nhanVienController.deleteNhanVien);

module.exports = router;
