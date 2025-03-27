const taixeService = require('../models/TaiXeModel');

const getAllTaiXe = async (req, res) => {
    try {
        const taixeList = await taixeService.getAllTaiXe();
        res.json(taixeList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTaiXeById = async (req, res) => {
    try {
        const { mataixe } = req.params;
        const taixe = await taixeService.getTaiXeById(mataixe);
        if (taixe) {
            res.json(taixe);
        } else {
            res.status(404).json({ message: "Tài xế không tồn tại" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createTaiXe = async (req, res) => {
    try {
        const { TENTX, NGAYSINH, GIOITINH, DIACHI, SODT, CMND, EMAIL, MAXE } = req.body;

        if (!TENTX || !NGAYSINH || !GIOITINH || !DIACHI || !SODT || !CMND || !EMAIL || !MAXE) {
            return res.status(400).json({ error: "Thiếu dữ liệu bắt buộc" });
        }

        const result = await taixeService.createTaiXe(req.body);
        res.status(201).json({ message: "Thêm tài xế thành công", data: result });
    } catch (error) {
        res.status(500).json({ error: "Lỗi server khi thêm tài xế" });
    }
};

const updateTaiXe = async (req, res) => {
    try {
        const { mataixe } = req.params;
        const updatedData = req.body;
        const result = await taixeService.updateTaiXe(mataixe, updatedData);
        if (result.affectedRows > 0) {
            res.json({ message: "Cập nhật tài xế thành công" });
        } else {
            res.status(404).json({ message: "Tài xế không tồn tại" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteTaiXe = async (req, res) => {
    try {
        const { mataixe } = req.params;
        const result = await taixeService.deleteTaiXe(mataixe);
        if (result.affectedRows > 0) {
            res.json({ message: "Xóa tài xế thành công" });
        } else {
            res.status(404).json({ message: "Tài xế không tồn tại" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllTaiXe,
    getTaiXeById,
    createTaiXe,
    updateTaiXe,
    deleteTaiXe
};
