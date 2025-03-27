const pool = require("../utils/connectDB");

const Ticket = {
  findTicket: async (mave, makh) => {
    const query = `
      SELECT 
        VX.MAVE, 
        TX.TENTUYEN AS TenTuyen,
        CTV.THANHTIEN AS ThanhTien,
        CTV.SOGHE AS SoGhe,
        CTV.SOGHENGOI AS SoGheNgoi,
        CTV.NGAYDATVE AS NgayDatVe,
        CTV.GHICHU AS GhiChu,
        KH.TENKH AS TenKhachHang,
        XE.TENXE AS TenXe,
        CX.NGAYGIOKHOIHANH AS NgayKhoiHanh
      FROM VE VX
      JOIN CHITIETVE CTV ON VX.MAVE = CTV.MAVE
      JOIN CHUYENXE CX ON VX.MACHUYENXE = CX.MACHUYENXE
      JOIN TUYENXE TX ON CX.MATUYEN = TX.MATUYEN
      JOIN XE ON CX.MAXE = XE.MAXE
      JOIN KHACHHANG KH ON CTV.MAKH = KH.MAKH
      WHERE CTV.MAVE = ? AND CTV.MAKH = ?`;

    try {
      const [rows] = await pool.query(query, [mave, makh]);
      return rows;
    } catch (error) {
      throw error;
    }
  },
  async getTicketById(mave) {
    const [ticket] = await pool.query("SELECT * FROM Ve WHERE MAVE = ?", [mave]);
    return ticket.length ? ticket[0] : null;
},

// Xóa chi tiết vé trước
async deleteTicketDetails(mave) {
    return pool.query("DELETE FROM ChiTietVe WHERE MAVE = ?", [mave]);
},

// Xóa vé
async deleteTicket(mave) {
    return pool.query("DELETE FROM Ve WHERE MAVE = ?", [mave]);
}
};

module.exports = Ticket;
