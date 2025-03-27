const quyenService = require('../models/QuyenModel');

const getAllQuyen = async (req, res) => {
    try {
        const quyenList = await quyenService.getAllQuyen();
        res.json(quyenList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getQuyenById = async (req, res) => {
    try {
        const { maquyen } = req.params;
        const quyen = await quyenService.getQuyenById(maquyen);
        if (quyen) {
            res.json(quyen);
        } else {
            res.status(404).json({ message: "Quyền không tồn tại" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createQuyen = async (req, res) => {
    try {
        const newQuyen = req.body;
        const result = await quyenService.createQuyen(newQuyen);
        res.status(201).json({ message: "Thêm quyền thành công", data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateQuyen = async (req, res) => {
    try {
        const { maquyen } = req.params;
        const updatedData = req.body;
        const result = await quyenService.updateQuyen(maquyen, updatedData);
        if (result.affectedRows > 0) {
            res.json({ message: "Cập nhật quyền thành công" });
        } else {
            res.status(404).json({ message: "Quyền không tồn tại" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteQuyen = async (req, res) => {
    try {
        const { maquyen } = req.params;
        const result = await quyenService.deleteQuyen(maquyen);
        if (result.affectedRows > 0) {
            res.json({ message: "Xóa quyền thành công" });
        } else {
            res.status(404).json({ message: "Quyền không tồn tại" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllQuyen,
    getQuyenById,
    createQuyen,
    updateQuyen,
    deleteQuyen
};
