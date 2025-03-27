const express = require('express');
const router = express.Router();
const taixeController = require('../controllers/TaiXeController');

router.get('/', taixeController.getAllTaiXe);
router.get('/:mataixe', taixeController.getTaiXeById);
router.post('/create', taixeController.createTaiXe);
router.post('/update/:mataixe', taixeController.updateTaiXe);
router.delete('/delete/:mataixe', taixeController.deleteTaiXe);

module.exports = router;
