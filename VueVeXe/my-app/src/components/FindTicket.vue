<template>
    <div class="container">
      <h2 class="title"><i class="fa fa-ticket"></i> Tìm Vé Xe</h2>
      <div class="form-group">
        <label for="mave"><i class="fa fa-barcode"></i> Mã Vé:</label>
        <input v-model="mave" type="number" id="mave" placeholder="Nhập MAVE" />
      </div>
      <div class="form-group">
        <label for="makh"><i class="fa fa-user"></i> Mã Khách Hàng:</label>
        <input v-model="makh" type="number" id="makh" placeholder="Nhập MAKH" />
      </div>
      <div class="button-group">
        <button @click="findTicket" :disabled="loading">
          <i class="fa fa-search"></i> {{ loading ? "Đang tìm..." : "Tìm Vé" }}
        </button>
        <button class="btn-datve" @click="redirectToXe">🏠 Về trang chủ</button>
        <button @click="cancelTicket" :disabled="!ticket || loading" class="cancel-btn">
          <i class="fa fa-times"></i> Hủy Vé
        </button>
      </div>
  
      <div v-if="error" class="error">
        <i class="fa fa-exclamation-circle"></i> {{ error }}
      </div>
  
      <div v-if="ticket" class="ticket-info">
        <h3><i class="fa fa-info-circle"></i> Thông Tin Vé</h3>
        <p><strong><i class="fa fa-barcode"></i> Mã Vé:</strong> {{ ticket.MAVE }}</p>
        <p><strong><i class="fa fa-road"></i> Tuyến Xe:</strong> {{ ticket.TenTuyen }}</p>
        <p><strong><i class="fa fa-credit-card" aria-hidden="true"></i> Giá Tiền:</strong> {{ formatCurrency(ticket.ThanhTien) }}</p>
        <p><strong><i class="fa fa-chair"></i> Số Ghế:</strong> {{ ticket.SoGhe }}</p>
        <p><strong><i class="fa fa-chair"></i> Số Ghế Ngồi:</strong> {{ ticket.SoGheNgoi }}</p>
        <p><strong><i class="fa fa-calendar"></i> Ngày Đặt Vé:</strong> {{ formatDate(ticket.NgayDatVe) }}</p>
        <p><strong><i class="fa fa-comment"></i> Ghi Chú:</strong> {{ ticket.GhiChu || "Không có" }}</p>
        <p><strong><i class="fa fa-user"></i> Khách Hàng:</strong> {{ ticket.TenKhachHang }}</p>
        <p><strong><i class="fa fa-bus"></i> Tên Xe:</strong> {{ ticket.TenXe }}</p>
        <p><strong><i class="fa fa-calendar"></i> Ngày Khởi Hành:</strong> {{ formatDate(ticket.NgayKhoiHanh) }}</p>
      </div>
    </div>
  </template>
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        mave: "",
        makh: "",
        ticket: null,
        error: "",
        loading: false,
      };
    },
  
    methods: {
      async findTicket() {
        this.error = "";
        this.ticket = null;
  
        if (!this.mave || !this.makh) {
          this.error = "Vui lòng nhập MAVE và MAKH!";
          return;
        }
  
        this.loading = true;
  
        try {
          const response = await axios.get("http://localhost:3000/ticket/timve", {
            params: { mave: this.mave, makh: this.makh },
          });
  
          if (response.data.length > 0) {
            this.ticket = response.data[0]; // Lấy vé đầu tiên nếu có nhiều vé
          } else {
            this.error = "Không tìm thấy vé.";
          }
        } catch (err) {
          this.error = "Lỗi khi tìm vé. Vui lòng thử lại!";
        } finally {
          this.loading = false;
        }
      },
  
      async cancelTicket() {
  if (!this.ticket) return;

  // Hiển thị hộp thoại xác nhận
  const confirmCancel = window.confirm("Bạn có chắc chắn muốn hủy vé này không?");
  if (!confirmCancel) return;

  this.loading = true;
  this.error = "";

  try {
    const response = await axios.delete(`http://localhost:3000/ticket/huyve/${this.ticket.MAVE}`);
    if (response.data.success) {
      this.ticket = null;
      this.mave = "";
      this.makh = "";
      this.error = "Hủy vé thành công!";
    } else {
      this.error = "Hủy vé thất bại. Vui lòng thử lại!";
    }
  } catch (err) {
    this.error = "Lỗi khi hủy vé. Vui lòng thử lại!";
  } finally {
    this.loading = false;
  }
},
      formatCurrency(value) {
        return new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(value);
      },
  
      formatDate(date) {
        return new Date(date).toLocaleDateString("vi-VN");
      },
      redirectToXe() {
      window.location.href = "http://localhost:8080/";
    },
    },
  };
  </script>
  <style scoped>
  .container {
    max-width: 500px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .title {
    text-align: center;
    color: #333;
    font-size: 24px;
  }
  
  .title i {
    margin-right: 10px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  label i {
    margin-right: 5px;
  }
  
  input {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .button-group {
    display: flex;
    gap: 10px;
    margin-top: 20px;
  }
  
  button {
    flex: 1;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  button i {
    margin-right: 5px;
  }
  
  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  .cancel-btn {
    background-color: #dc3545;
  }
  
  .error {
    color: red;
    text-align: center;
    margin-top: 10px;
    font-weight: bold;
  }
  
  .error i {
    margin-right: 5px;
  }
  
  .ticket-info {
    margin-top: 20px;
    padding: 15px;
    border: 1px solid #007bff;
    border-radius: 5px;
    background-color: #f8f9fa;
  }
  
  .ticket-info h3 {
    text-align: center;
    color: #007bff;
    margin-bottom: 15px;
  }
  
  .ticket-info p {
    margin: 5px 0;
  }
  
  .ticket-info i {
    margin-right: 5px;
    color: #007bff;
  }
  </style>