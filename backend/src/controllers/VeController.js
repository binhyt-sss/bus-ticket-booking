const veService = require('../models/VeModel');

const getAllVe = async (req, res) => {
    try {
        const veList = await veService.getAllVe();
        res.json(veList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getVeById = async (req, res) => {
    try {
        const { mave } = req.params;
        const ve = await veService.getVeById(mave);
        if (ve) {
            res.json(ve);
        } else {
            res.status(404).json({ message: "Vé không tồn tại" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createVe = async (req, res) => {
    try {
        const newVe = req.body;
        const result = await veService.createVe(newVe);
        res.status(201).json({ message: "Thêm vé thành công", data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const createVeVaChiTiet = async (req, res) => {
    try {
        const newVe = req.body;
        const result = await veService.createVeVaChiTiet(newVe);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const updateVe = async (req, res) => {
    try {
        const { mave } = req.params;
        const updatedData = req.body;
        const result = await veService.updateVe(mave, updatedData);
        if (result.affectedRows > 0) {
            res.json({ message: "Cập nhật vé thành công" });
        } else {
            res.status(404).json({ message: "Vé không tồn tại" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteVe = async (req, res) => {
    try {
        const { mave } = req.params;
        const result = await veService.deleteVe(mave);
        if (result.affectedRows > 0) {
            res.json({ message: "Xóa vé thành công" });
        } else {
            res.status(404).json({ message: "Vé không tồn tại" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllVe,
    getVeById,
    createVe,
    updateVe,
    createVeVaChiTiet,
    deleteVe
};
