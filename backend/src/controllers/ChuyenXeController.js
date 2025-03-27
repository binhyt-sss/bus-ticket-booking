const chuyenXeService = require('../models/ChuyenXeModel');

const getAllChuyenXe = async (req, res) => {
    try {
        const chuyenXeList = await chuyenXeService.getAllChuyenXe();
        res.json(chuyenXeList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getMaxeByTenxeController = async (req, res) => {
    try {
        const tenXe = req.query.tenXe;
        if (!tenXe) return res.status(400).json({ error: "Thiếu thông tin tên xe" });

        console.log("✅ Nhận request lấy mã xe cho:", tenXe);

        const maxe = await chuyenXeService.getMaxeByTenxe(tenXe);

        console.log("🔍 Kết quả lấy mã xe:", maxe);

        if (maxe) {
            return res.json({ maxe });
        } else {
            return res.status(404).json({ error: "Không tìm thấy mã xe" });
        }
    } catch (error) {
        console.error("❌ Lỗi server khi lấy mã xe:", error);
        return res.status(500).json({ error: "Lỗi server khi lấy mã xe" });
    }
};
const getChuyenXeById = async (req, res) => {
    try {
        const { machuyenxe } = req.params;
        const chuyenXe = await chuyenXeService.getChuyenXeById(machuyenxe);
        if (chuyenXe) {
            res.json(chuyenXe);
        } else {
            res.status(404).json({ message: "Chuyến xe không tồn tại" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createChuyenXe = async (req, res) => {
    try {
        const newChuyenXe = req.body;
        const result = await chuyenXeService.createChuyenXe(newChuyenXe);
        res.status(201).json({ message: "Thêm chuyến xe thành công", data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateChuyenXe = async (req, res) => {
    try {
        const { machuyenxe } = req.params;
        const updatedData = req.body;
        const result = await chuyenXeService.updateChuyenXe(machuyenxe, updatedData);
        if (result.affectedRows > 0) {
            res.json({ message: "Cập nhật chuyến xe thành công" });
        } else {
            res.status(404).json({ message: "Chuyến xe không tồn tại" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteChuyenXe = async (req, res) => {
    try {
        const { machuyenxe } = req.params;
        const result = await chuyenXeService.deleteChuyenXe(machuyenxe);
        if (result.affectedRows > 0) {
            res.json({ message: "Xóa chuyến xe thành công" });
        } else {
            res.status(404).json({ message: "Chuyến xe không tồn tại" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllChuyenXe,
    getChuyenXeById,
    createChuyenXe,
    updateChuyenXe,
    getMaxeByTenxeController,
    deleteChuyenXe
};
