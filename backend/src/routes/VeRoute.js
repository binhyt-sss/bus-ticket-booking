const express = require('express');
const router = express.Router();
const veController = require('../controllers/VeController');

router.get('/', veController.getAllVe);
router.get('/:mave', veController.getVeById);
router.post('/create', veController.createVe);
router.post('/createVeVaChiTiet', veController.createVeVaChiTiet);
router.post('/update/:mave', veController.updateVe);
router.delete('/delete/:mave', veController.deleteVe);

module.exports = router;
