const express = require('express');
const router = express.Router();
const pool = require('../utils/connectDB'); 
const khachHangController = require('../controllers/KhachHangController');

router.get('/khachhang', khachHangController.getAllKhachHang);
router.get('/:makh', khachHangController.getKhachHangById);
// router.post('/create', khachHangController.createKhachHang);
router.post('/create', async (req, res) => {
    console.log("Body nhận được:", req.body); // Kiểm tra dữ liệu gửi lên

    try {
        const { TENKH, NGAYSINH, GIOITINH, DIACHI, SODT, CMND, EMAIL } = req.body;

        if (!TENKH || !NGAYSINH || !GIOITINH || !DIACHI || !SODT || !CMND || !EMAIL) {
            return res.status(400).json({ message: "Thiếu dữ liệu đầu vào!" });
        }

        const query = `INSERT INTO KHACHHANG (TENKH, NGAYSINH, GIOITINH, DIACHI, SODT, CMND, EMAIL) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        await pool.execute(query, [TENKH, NGAYSINH, GIOITINH, DIACHI, SODT, CMND, EMAIL]);

        res.status(201).json({ message: "Thêm khách hàng thành công!" });
    } catch (error) {
        console.error("Lỗi khi thêm khách hàng:", error);
        res.status(500).json({ message: "Lỗi server!" });
    }
});
router.post('/update/:makh', khachHangController.updateKhachHang);
router.delete('/delete/:makh', khachHangController.deleteKhachHang);

module.exports = router;
