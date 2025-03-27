const nhanVienService = require('../models/NhanVienModel');

const getAllNhanVien = async (req, res) => {
    try {
        const nhanVienList = await nhanVienService.getAllNhanVien();
        res.json(nhanVienList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getNhanVienById = async (req, res) => {
    try {
        const { manv } = req.params;
        const nhanVien = await nhanVienService.getNhanVienById(manv);
        if (nhanVien) {
            res.json(nhanVien);
        } else {
            res.status(404).json({ message: "Nhân viên không tồn tại" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createNhanVien = async (req, res) => {
    try {
        const newNhanVien = req.body;
        const result = await nhanVienService.createNhanVien(newNhanVien);
        res.status(201).json({ message: "Thêm nhân viên thành công", data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateNhanVien = async (req, res) => {
    try {
        const { manv } = req.params;
        const updatedData = req.body;
        const result = await nhanVienService.updateNhanVien(manv, updatedData);
        if (result.affectedRows > 0) {
            res.json({ message: "Cập nhật nhân viên thành công" });
        } else {
            res.status(404).json({ message: "Nhân viên không tồn tại" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteNhanVien = async (req, res) => {
    try {
        const { manv } = req.params;
        const result = await nhanVienService.deleteNhanVien(manv);
        if (result.affectedRows > 0) {
            res.json({ message: "Xóa nhân viên thành công" });
        } else {
            res.status(404).json({ message: "Nhân viên không tồn tại" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllNhanVien,
    getNhanVienById,
    createNhanVien,
    updateNhanVien,
    deleteNhanVien
};
