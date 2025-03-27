const chiTietVeService = require('../models/ChiTietVeModel');

const getAllChiTietVe = async (req, res) => {
    try {
        const chiTietVeList = await chiTietVeService.getAllChiTietVe();
        res.json(chiTietVeList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getChiTietVeById = async (req, res) => {
    try {
        const { mactve } = req.params;
        const chiTietVe = await chiTietVeService.getChiTietVeById(mactve);
        if (chiTietVe) {
            res.json(chiTietVe);
        } else {
            res.status(404).json({ message: "Chi tiết vé không tồn tại" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createChiTietVe = async (req, res) => {
    try {
        const newChiTietVe = req.body;
        const result = await chiTietVeService.createChiTietVe(newChiTietVe);
        res.status(201).json({ message: "Thêm chi tiết vé thành công", data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateChiTietVe = async (req, res) => {
    try {
        const { mactve } = req.params;
        const updatedData = req.body;
        const result = await chiTietVeService.updateChiTietVe(mactve, updatedData);
        if (result.affectedRows > 0) {
            res.json({ message: "Cập nhật chi tiết vé thành công" });
        } else {
            res.status(404).json({ message: "Chi tiết vé không tồn tại" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteChiTietVe = async (req, res) => {
    try {
        const { mactve } = req.params;
        const result = await chiTietVeService.deleteChiTietVe(mactve);
        if (result.affectedRows > 0) {
            res.json({ message: "Xóa chi tiết vé thành công" });
        } else {
            res.status(404).json({ message: "Chi tiết vé không tồn tại" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = {
    getAllChiTietVe,
    getChiTietVeById,
    createChiTietVe,
    updateChiTietVe,
    deleteChiTietVe
};