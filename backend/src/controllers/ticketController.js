const Ticket = require("../models/ticketModel");

const ticketController = {
  findTicket: async (req, res) => {
    try {
      const { mave, makh } = req.query;

      if (!mave || !makh) {
        return res.status(400).json({ message: "Vui lòng nhập MAVE và MAKH" });
      }

      const data = await Ticket.findTicket(mave, makh);

      if (data.length === 0) {
        return res.status(404).json({ message: "Không tìm thấy vé" });
      }

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error });
    }
  },
  async cancelTicket(req, res) {
    const { mave } = req.params;

    try {
        console.log(`🔍 Hủy vé: MAVE = ${mave}`);

        // Kiểm tra vé có tồn tại không
        const ticket = await Ticket.getTicketById(mave);
        if (!ticket) {
            console.log("❌ Vé không tồn tại!");
            return res.status(404).json({ error: "Vé không tồn tại hoặc đã bị hủy." });
        }

        // Xóa chi tiết vé trước
        await Ticket.deleteTicketDetails(mave);
        console.log("✅ Đã xóa chi tiết vé!");

        // Xóa vé chính
        await Ticket.deleteTicket(mave);
        console.log("✅ Đã xóa vé thành công!");

        res.json({ success: true, message: "Hủy vé thành công!" });
    } catch (error) {
        console.error("❌ Lỗi khi hủy vé:", error);
        res.status(500).json({ error: "Lỗi khi hủy vé.", details: error.message });
    }
}
};

module.exports = ticketController;
