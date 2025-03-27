const khachHangService = require('../models/KhachHangModel');

const getAllKhachHang = async (req, res) => {
    try {
        const khachHangList = await khachHangService.getAllKhachHang();
        res.json(khachHangList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getKhachHangById = async (req, res) => {
    try {
        const { makh } = req.params;
        const khachHang = await khachHangService.getKhachHangById(makh);
        if (khachHang) {
            res.json(khachHang);
        } else {
            res.status(404).json({ message: "Khách hàng không tồn tại" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createKhachHang = async (req, res) => {
    try {
        const newKhachHang = req.body;
        const result = await khachHangService.createKhachHang(newKhachHang);
        res.status(201).json({ message: "Thêm khách hàng thành công", data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateKhachHang = async (req, res) => {
    try {
        const { makh } = req.params;
        const updatedData = req.body;
        const result = await khachHangService.updateKhachHang(makh, updatedData);
        if (result.affectedRows > 0) {
            res.json({ message: "Cập nhật khách hàng thành công" });
        } else {
            res.status(404).json({ message: "Khách hàng không tồn tại" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteKhachHang = async (req, res) => {
    try {
        const { makh } = req.params;
        const result = await khachHangService.deleteKhachHang(makh);
        if (result.affectedRows > 0) {
            res.json({ message: "Xóa khách hàng thành công" });
        } else {
            res.status(404).json({ message: "Khách hàng không tồn tại" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllKhachHang,
    getKhachHangById,
    createKhachHang,
    updateKhachHang,
    deleteKhachHang
};
