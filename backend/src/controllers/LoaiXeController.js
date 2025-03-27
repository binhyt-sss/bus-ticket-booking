const loaiXeService = require('../models/LoaiXeModel');

const getAllLoaiXe = async (req, res) => {
    try {
        const loaiXeList = await loaiXeService.getAllLoaiXe();
        res.json(loaiXeList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getLoaiXeById = async (req, res) => {
    try {
        const { maloaixe } = req.params;
        const loaiXe = await loaiXeService.getLoaiXeById(maloaixe);
        if (loaiXe) {
            res.json(loaiXe);
        } else {
            res.status(404).json({ message: "Loại xe không tồn tại" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createLoaiXe = async (req, res) => {
    try {
        const newLoaiXe = req.body;
        const result = await loaiXeService.createLoaiXe(newLoaiXe);
        res.status(201).json({ message: "Thêm loại xe thành công", data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateLoaiXe = async (req, res) => {
    try {
        const { maloaixe } = req.params;
        const updatedData = req.body;
        const result = await loaiXeService.updateLoaiXe(maloaixe, updatedData);
        if (result.affectedRows > 0) {
            res.json({ message: "Cập nhật loại xe thành công" });
        } else {
            res.status(404).json({ message: "Loại xe không tồn tại" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteLoaiXe = async (req, res) => {
    try {
        const { maloaixe } = req.params;
        const result = await loaiXeService.deleteLoaiXe(maloaixe);
        if (result.affectedRows > 0) {
            res.json({ message: "Xóa loại xe thành công" });
        } else {
            res.status(404).json({ message: "Loại xe không tồn tại" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllLoaiXe,
    getLoaiXeById,
    createLoaiXe,
    updateLoaiXe,
    deleteLoaiXe
};
