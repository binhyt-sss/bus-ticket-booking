const express = require('express');
const router = express.Router();
const xeController = require('../controllers/XeController');

router.get('/', xeController.getAllXe);
router.get('/timchuyen', xeController.getXeByDiemDiDiemDen);
router.get('/thongtinxe/:maxe', xeController.getThongTinXeController);
router.get("/layghe", xeController.layGhe);
router.get('/:maxe', xeController.getXeById);
router.post('/create', xeController.createXe);
router.post('/update/:maxe', xeController.updateXe);
router.delete('/delete/:maxe',xeController.deleteXe);


module.exports = router;
