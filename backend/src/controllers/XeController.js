const xeService = require('../models/XeModel');

const getAllXe = async (req, res) => {
    try {
        const xeList = await xeService.getAllXe();
        res.json(xeList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const layGhe = async (req, res) => {
    try {
        const data = await xeService.getGheByVe();
        res.json(data);
    } catch (error) {
        console.error("Lỗi lấy danh sách ghế:", error);
        res.status(500).json({ error: "Lỗi server" });
    }
};
const getXeByDiemDiDiemDen = async (req, res) => {
    try {
        const { diemDi, diemDen } = req.query;

        if (!diemDi || !diemDen) {
            return res.status(400).json({ message: "Vui lòng chọn điểm đi và điểm đến!" });
        }

        const results = await xeService.getXeByDiemDiDiemDen(diemDi, diemDen);
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error: error.message });
    }
};
const getThongTinXeController = async (req, res) => {
    try {
        const { maxe } = req.params;
        const xe = await xeService.getThongTinXe(maxe);
        if (xe) {
            res.status(200).json({ success: true, data: xe });
        } else {
            res.status(404).json({ success: false, message: "Xe không tồn tại" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi server", error: error.message });
    }
};


const getXeById = async (req, res) => {
    try {
        const { maxe } = req.params;
        const xe = await xeService.getXeById(maxe);
        if (xe) {
            res.json(xe);
        } else {
            res.status(404).json({ message: "Xe không tồn tại" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createXe = async (req, res) => {
    try {
        const newXe = req.body;
        const result = await xeService.createXe(newXe);
        res.status(201).json({ message: "Thêm xe thành công", data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateXe = async (req, res) => {
    try {
        const { maxe } = req.params;
        const updatedData = req.body;
        const result = await xeService.updateXe(maxe, updatedData);
        if (result.affectedRows > 0) {
            res.json({ message: "Cập nhật xe thành công" });
        } else {
            res.status(404).json({ message: "Xe không tồn tại" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteXe = async (req, res) => {
    try {
        const { maxe } = req.params;
        const result = await xeService.deleteXe(maxe);
        if (result.affectedRows > 0) {
            res.json({ message: "Xóa xe thành công" });
        } else {
            res.status(404).json({ message: "Xe không tồn tại" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllXe,
    getXeById,
    createXe,
    updateXe,
    deleteXe,
    getThongTinXeController,
    getXeByDiemDiDiemDen,
    layGhe
};
