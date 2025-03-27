const express = require('express');
const router = express.Router();
const quyenController = require('../controllers/QuyenController');

router.get('/', quyenController.getAllQuyen);
router.get('/:maquyen', quyenController.getQuyenById);
router.post('/create', quyenController.createQuyen);
router.post('/update/:maquyen', quyenController.updateQuyen);
router.delete('/delete/:maquyen', quyenController.deleteQuyen);

module.exports = router;
