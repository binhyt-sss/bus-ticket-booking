const tuyenXeService = require('../models/TuyenXeModel');

const getAllTuyenXe = async (req, res) => {
    try {
        const tuyenXeList = await tuyenXeService.getAllTuyenXe();
        res.json(tuyenXeList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllDiemDen = async (req, res) => {
    try {
        const tuyenXeList = await tuyenXeService.getAllDiemDen();
        res.json(tuyenXeList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllDiemDi = async (req, res) => {
    try {
        const tuyenXeList = await tuyenXeService.getAllDiemDi();
        res.json(tuyenXeList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTuyenXeById = async (req, res) => {
    try {
        const { matuyen } = req.params;
        const tuyenXe = await tuyenXeService.getTuyenXeById(matuyen);
        if (tuyenXe) {
            res.json(tuyenXe);
        } else {
            res.status(404).json({ message: "Tuyến xe không tồn tại" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createTuyenXe = async (req, res) => {
    try {
        const newTuyenXe = req.body;
        const result = await tuyenXeService.createTuyenXe(newTuyenXe);
        res.status(201).json({ message: "Thêm tuyến xe thành công", data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateTuyenXe = async (req, res) => {
    try {
        const { matuyen } = req.params;
        const updatedData = req.body;
        const result = await tuyenXeService.updateTuyenXe(matuyen, updatedData);
        if (result.affectedRows > 0) {
            res.json({ message: "Cập nhật tuyến xe thành công" });
        } else {
            res.status(404).json({ message: "Tuyến xe không tồn tại" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteTuyenXe = async (req, res) => {
    try {
        const { matuyen } = req.params;
        const result = await tuyenXeService.deleteTuyenXe(matuyen);
        if (result.affectedRows > 0) {
            res.json({ message: "Xóa tuyến xe thành công" });
        } else {
            res.status(404).json({ message: "Tuyến xe không tồn tại" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllTuyenXe,
    getTuyenXeById,
    createTuyenXe,
    updateTuyenXe,
    deleteTuyenXe,
    getAllDiemDen,
    getAllDiemDi
};
