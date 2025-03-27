<template>
    <div class="datve-container">
      <h1 class="title">🚍 Đặt Vé Xe</h1>
  
      <div class="info-box" v-if="khachHang">
        <h2>📌 Thông tin khách hàng</h2>
        <ul>
          <li><strong>Họ tên:</strong> {{ khachHang.TENKH }}</li>
          <li><strong>Ngày sinh:</strong> {{ khachHang.NGAYSINH }}</li>
          <li><strong>Giới tính:</strong> {{ khachHang.GIOITINH === 'M' ? 'Nam' : 'Nữ' }}</li>
          <li><strong>Địa chỉ:</strong> {{ khachHang.DIACHI }}</li>
          <li><strong>Số điện thoại:</strong> {{ khachHang.SODT }}</li>
          <li><strong>Email:</strong> {{ khachHang.EMAIL }}</li>
        </ul>
      </div>
  
      <div class="info-box" v-if="xe">
        <h2>🚌 Thông tin xe</h2>
        <p><strong>Tên xe:</strong> {{ xe.TENXE }}</p>
  <p><strong>Loại xe:</strong> {{ xe.LOAIXE }}</p>
  <p><strong>Tài xế:</strong> {{ xe.TAI_XE }}</p>
  <p><strong>Tuyến đường:</strong> {{ xe.TUYEN_DUONG }}</p>
  <p><strong>Điểm đi:</strong> {{ xe.DIEM_DI }}</p>
  <p><strong>Điểm đến:</strong> {{ xe.DIEM_DEN }}</p>
  <p><strong>Giá vé:</strong> {{ xe.GIA_VE }}</p>
  <p><strong>Ngày khởi hành:</strong> {{ xe.NGAY_KHOI_HANH }}</p>
  <p><strong>Giờ đến:</strong> {{ xe.GIO_DEN }}</p>
  <p><strong>Ghi chú:</strong> {{ xe.GHI_CHU }}</p>
  <p><strong>Ghế đã chọn:</strong> {{ xe.GHE_DA_CHON.join(", ") }}</p>
  <p><strong>Số lượng ghế:</strong> {{ xe.SO_LUONG_GHE }}</p>
      </div>

<!-- Modal Xác Nhận Đặt Vé -->
<div class="modal fade" id="modalXacNhan" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true" v-if="showModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">🎉 Đặt Vé Thành Công!</h5>
      </div>
      <div class="modal-body" v-if="veDaDat">
        <p><strong>Mã vé:</strong> {{ veDaDat.MAVE }}</p>
<p><strong>Mã khách hàng:</strong> {{ veDaDat.MAKH }}</p>
<p><strong>Họ tên:</strong> {{ veDaDat.HOTEN }}</p>
<p><strong>Số điện thoại:</strong> {{ veDaDat.SDT }}</p>
<p><strong>Email:</strong> {{ veDaDat.EMAIL }}</p>
<p><strong>CMND:</strong> {{ veDaDat.CMND }}</p>
<p><strong>Số ghế:</strong> {{ veDaDat.SOGHE }}</p>
<p><strong>Giá vé:</strong> {{ veDaDat.GIAVE?.toLocaleString() }} VND</p>
<p><strong>Ngày đặt vé:</strong> {{ veDaDat.NGAYDATVE }}</p>
<p><strong>Ghi chú:</strong> {{ veDaDat.GHICHU }}</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
      </div>
    </div>
  </div>
</div>
      <button class="btn-datve" @click="datVe">🎟 Xác nhận đặt vé</button>
      <button class="btn-datve" @click="redirectToXe">🏠 Về trang chủ</button>
    </div>
  </template>
  
  <script>

  
  export default {
    data() {
      return {
        ve: {},
        khachHang: null,
        xe: null,
        veDaDat: null, // Lưu thông tin vé sau khi đặt
        showModal: false // Kiểm soát hiển thị modal
      };
    },
    mounted() {
      console.log("🔥 Mounted - Route Query:", this.$route.query);
      this.loadKhachHang();
      this.fetchCarDetail();
    },
    redirectToXe() {
      window.location.href = "http://localhost:8080/";
    },
    methods: {
      redirectToXe() {
      window.location.href = "http://localhost:8080/";
    },
        loadKhachHang() {
  this.khachHang = {
    TENKH: decodeURIComponent(this.$route.query.hoten || "Không xác định"),
    NGAYSINH: this.$route.query.ngaysinh || "Không có dữ liệu",
    GIOITINH: (this.$route.query.gioitinh && this.$route.query.gioitinh.toUpperCase() === "M") ? "Nam" : "Nữ",
    DIACHI: decodeURIComponent(this.$route.query.diachi || "Không có địa chỉ"),
    SODT: this.$route.query.sdt || "Không có SĐT",
    EMAIL: this.$route.query.email || "Không có email"
  };
},

fetchCarDetail() {
    const tenXe = decodeURIComponent(this.$route.query.tenXe || "Không có dữ liệu");
    fetch(`http://localhost:3000/chuyenxe/getMaxeByTenxe?tenXe=${tenXe}`)
    .then(response => response.json())
    .then(data => {
      if (data.maxe) {
        console.log("✅ MAXE lấy từ server:", data.maxe);
        this.xe.MAXE = data.maxe; // Cập nhật MAXE vào dữ liệu xe
      } else {
        console.error("❌ Không tìm thấy mã xe");
      }
    })
    .catch(error => console.error("❌ Lỗi khi lấy MAXE:", error));
    console.log("✅ MAXE từ route query:", this.$route.query.maxe);
  this.xe = {
    TENXE: decodeURIComponent(this.$route.query.tenXe || "Không có dữ liệu"),
    LOAIXE: decodeURIComponent(this.$route.query.loaiXe || "Không có dữ liệu"),
    TAI_XE: decodeURIComponent(this.$route.query.taiXe || "Không có dữ liệu"),
    TUYEN_DUONG: decodeURIComponent(this.$route.query.tuyenDuong || "Không có dữ liệu"),
    DIEM_DI: decodeURIComponent(this.$route.query.diemDi || "Không có dữ liệu"),
    DIEM_DEN: decodeURIComponent(this.$route.query.diemDen || "Không có dữ liệu"),
    GIA_VE: this.formatCurrency(this.$route.query.giaVe || 0),
    NGAY_KHOI_HANH: this.formatDate(this.$route.query.ngayKhoiHanh || ""),
    GIO_DEN: this.$route.query.gioDen || "Không có dữ liệu",
    GHI_CHU: decodeURIComponent(this.$route.query.ghiChu || ""),
    GHE_DA_CHON: this.$route.query.gheDaChon ? this.$route.query.gheDaChon.split(",") : [],
    SO_LUONG_GHE: this.$route.query.soLuongGhe || 0
  };
},
datVe() {
    console.log("MAXE khi đặt vé:", this.xe.MAXE);
  const datVePayload = {
    MAXE: this.xe.MAXE,
    SOGHE: this.xe.GHE_DA_CHON,
    NGAYDATVE: new Date().toISOString().split("T")[0], // Lấy ngày hiện tại
    GHICHU: this.xe.GHI_CHU,
    HOTEN: this.khachHang.TENKH,
    EMAIL: this.khachHang.EMAIL,
    SDT: this.khachHang.SODT,
    CMND: this.$route.query.cmnd || "Không có CMND",
    GIAVE: this.$route.query.giaVe || 0
  };
  
  console.log("🚀 Dữ liệu gửi đi:", datVePayload); // Kiểm tra toàn bộ payload
  console.log("📌 MAXE khi đặt vé:", datVePayload.MAXE); // Kiểm tra MAXE cụ thể
  fetch("http://localhost:3000/ve/createVeVaChiTiet", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(datVePayload)
  })
    .then(response => response.json())
    .then(data => {
      console.log("Dữ liệu API trả về:", data);
      if (data.success&& data.ve && data.chiTietVe) {
            this.veDaDat = {
                MAVE: data.ve.MAVE,
                MAKH: data.chiTietVe.MAKH,
                ...datVePayload
            };
            this.showModal = true; // Hiển thị modal
            
      } else {
        alert("❌ Lỗi: " + data.message);
      }
    })
    .catch(error => {
      console.error("Lỗi khi đặt vé:", error);
      alert("❌ Đặt vé thất bại!");
    });
},
    formatCurrency(value) {
        return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
      },
      formatDate(dateString) {
        return new Date(dateString).toLocaleDateString("vi-VN");
      },
    },
  };
  </script>
  
  <style scoped>
  .datve-container {
    max-width: 600px;
    margin: 40px auto;
    padding: 20px;
    background: #f9f9f9;
    border-radius: 12px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .title {
    font-size: 28px;
    font-weight: bold;
    color: #007bff;
    margin-bottom: 20px;
  }
  
  .info-box {
    background: white;
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 10px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
    text-align: left;
  }
  
  .info-box h2 {
    font-size: 20px;
    color: #333;
    margin-bottom: 10px;
  }
  
  .info-box ul {
    list-style: none;
    padding: 0;
  }
  
  .info-box li {
    font-size: 16px;
    margin: 5px 0;
  }
  
  .price {
    color: #d9534f;
    font-weight: bold;
  }
  
  .btn-datve {
    width: 100%;
    padding: 12px;
    background: #28a745;
    color: white;
    font-size: 18px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    margin-top: 15px;
    transition: 0.3s;
  }
  
  .btn-datve:hover {
    background: #218838;
  }
  </style>
  