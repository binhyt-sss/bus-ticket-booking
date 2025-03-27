<template>
  <div v-if="xe" class="container">
    <h1 class="title">Chi tiết xe: {{ xe.TENXE }}</h1>
    
    <!-- Ảnh xe -->
    <img :src="xe.ANHXE" :alt="xe.TENXE" class="car-image" />

    <!-- Thông tin chi tiết -->
    <div class="info">
      <p><strong>Loại xe:</strong> {{ xe.TENLOAIXE }}</p>
      <p><strong>Tài xế:</strong> {{ xe.TENTX }}</p>
      <p><strong>Tuyến đường:</strong> {{ xe.TENTUYEN }}</p>
      <p><strong>Điểm đi:</strong> {{ xe.DIEMDI }}</p>
      <p><strong>Điểm đến:</strong> {{ xe.DIEMDEN }}</p>
      <p><strong>Giá vé:</strong> {{ formatCurrency(xe.BANGGIA) }}</p>
      <p><strong>Ngày khởi hành:</strong> {{ formatDate(xe.NGAYGIOKHOIHANH) }}</p>
      <p><strong>Giờ đến:</strong> {{ xe.GIODEN }}</p>
      <p><strong>Ghi chú:</strong> {{ xe.GHICHU }}</p>
    </div>

    <!-- Nút đặt vé -->
    <button class="book-button" @click="handleBooking">
      <i class="fa fa-ticket" aria-hidden="true"></i>
      Đặt vé ngay
    </button>

    <!-- Modal chọn ghế -->
    <div class="modal-overlay" v-if="showSeatModal" @click.self="showSeatModal = false">
      <div class="modal-content">
        <h3 class="text-2xl font-semibold mb-4">Chọn ghế ngồi</h3>
        <div class="seating-chart">
          <div class="driver-icon"><img src="@/assets/steering-wheel.png"></div> 
          <div class="seating-columns">
            <div v-for="(column, columnIndex) in seatingLayout" :key="columnIndex" class="seat-column">
              <div v-for="(seat, seatIndex) in column" :key="seatIndex" 
                   :class="['seat', seat.status]" 
                   @click="selectSeat(seat)">
                {{ seat.label }}
              </div>
            </div>
          </div>
        </div>
        <div class="selected-seats mt-4">
          <h3 class="text-xl font-semibold">Ghế đã chọn:</h3>
          <p v-if="selectedSeats.length === 0">Chưa có ghế nào được chọn.</p>
          <ul v-else>
            <li v-for="seat in selectedSeats" :key="seat">{{ seat }}</li>
          </ul>
        </div>
        <div class="modal-buttons">
          <button class="confirm-button" @click="showInfoModal = true">
            <i class="fa fa-check" aria-hidden="true"></i> Tiếp tục
          </button>
          <button class="close-button" @click="showSeatModal = false">
            <i class="fa fa-window-close" aria-hidden="true"></i> Đóng
          </button>
        </div>
      </div>
    </div>

   <!-- Modal nhập thông tin cá nhân -->
<div class="modal-overlay" v-if="showInfoModal" @click.self="showInfoModal = false">
  <div class="modal-content">
    <h3 class="text-2xl font-semibold">Nhập thông tin cá nhân</h3>
    <form @submit.prevent="submitUserInfo">
      <div class="form-group">
        <label>Họ tên:</label>
        <input type="text" v-model="userInfo.hoten" required />
      </div>

      <div class="form-group">
        <label>Ngày sinh:</label>
        <input type="date" v-model="userInfo.ngaysinh" required />
      </div>

      <div class="form-group">
        <label>Giới tính:</label>
        <select v-model="userInfo.gioitinh">
          <option value="M">Nam</option>
          <option value="F">Nữ</option>
        </select>
      </div>

      <div class="form-group">
        <label>Địa chỉ:</label>
        <input type="text" v-model="userInfo.diachi" required />
      </div>

      <div class="form-group">
        <label>Số điện thoại:</label>
        <input type="tel" v-model="userInfo.sdt" required />
      </div>

      <div class="form-group">
        <label>CMND/CCCD:</label>
        <input type="text" v-model="userInfo.cmnd" required />
      </div>

      <div class="form-group">
        <label>Email:</label>
        <input type="email" v-model="userInfo.email" required />
      </div>

      <div class="modal-buttons">
        <button type="submit" class="confirm-button" @click="submitForm">
          <i class="fa fa-check"></i> Xác nhận thông tin
        </button>
        <button type="button" class="close-button" @click="showInfoModal = false">
          <i class="fa fa-window-close"></i> Đóng
        </button>
      </div>
    </form>
  </div>
</div>


    <router-link to="/" class="back-button">
      <i class="fa fa-arrow-left" aria-hidden="true"></i> Quay lại
    </router-link>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CarDetail",
  data() {
    return {
      xe: null,
      showSeatModal: false,
      showInfoModal: false,
      seatingLayout: [],
      selectedSeats: [],
      userInfo: {
        hoten: "",
        ngaysinh: "",
        gioitinh: "M",
        diachi: "",
        sdt: "",
        cmnd: "",
        email: "",
      },
      isSubmitting: false,
    };
  },
  props: ["id"],
  mounted() {
    this.fetchCarDetail();
    this.initializeSeatingChart();
  },
  methods: {
    async submitForm() {
    const dataToSend = {
      TENKH: this.userInfo.hoten,
      NGAYSINH: this.userInfo.ngaysinh,
      GIOITINH: this.userInfo.gioitinh,
      DIACHI: this.userInfo.diachi,
      SODT: this.userInfo.sdt,
      CMND: this.userInfo.cmnd,
      EMAIL: this.userInfo.email
    };

    console.log("Dữ liệu gửi lên:", dataToSend);

    try {
        const response = await fetch('http://localhost:3000/khachhang/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        });

        const result = await response.json();

        if (response.ok) {
            alert('Thêm khách hàng thành công!');
            this.$router.push({
                path: "/datve",
                query: {
                    hoten: this.userInfo.hoten,
                    ngaysinh: this.userInfo.ngaysinh,
                    gioitinh: this.userInfo.gioitinh,
                    diachi: this.userInfo.diachi,
                    sdt: this.userInfo.sdt,
                    cmnd: this.userInfo.cmnd,
                    email: this.userInfo.email,
                    xeId: this.xe.IDXE,
                    tenXe: this.xe.TENXE,
                    loaiXe: this.xe.TENLOAIXE,
                    taiXe: this.xe.TENTX,
                    tuyenDuong: this.xe.TENTUYEN,
                    diemDi: this.xe.DIEMDI,
                    diemDen: this.xe.DIEMDEN,
                    giaVe: this.xe.BANGGIA,
                    ngayKhoiHanh: this.xe.NGAYGIOKHOIHANH,
                    gioDen: this.xe.GIODEN,
                    ghiChu: this.xe.GHICHU,
                    gheDaChon: this.selectedSeats.join(","), 
                    soLuongGhe: this.selectedSeats.length
                }
            });
        } else {
            alert(`Lỗi từ server: ${result.message}`);
        }
    } catch (error) {
        console.error('Lỗi khi gửi request:', error);
        alert('Lỗi kết nối đến server!');
    }
},
    fetchCarDetail() {
      axios
        .get(`http://localhost:3000/xe/thongtinxe/${this.id}`)
        .then((response) => {
          this.xe = response.data.data;
        })
        .catch((error) => {
          console.error("Lỗi tải thông tin xe:", error);
        });
    },
    async initializeSeatingChart() {
    const columns = 4;
    const seatsPerColumn = 5;

    // Lấy danh sách vé đã đặt từ API
    try {
      const response = await axios.get('http://localhost:3000/xe/layghe');
      const bookedSeats = response.data.map(item => item.SoGhe.split(', ')).flat(); // Danh sách ghế đã đặt

      for (let i = 1; i <= columns; i++) {
        const column = [];
        for (let j = 1; j <= seatsPerColumn; j++) {
          const seatLabel = `${String.fromCharCode(64 + i)}${j}`;
          column.push({
            label: seatLabel,
            status: bookedSeats.includes(seatLabel) ? "booked" : "available"
          });
        }
        this.seatingLayout.push(column);
      }
    } catch (error) {
      console.error("Lỗi tải danh sách vé đã đặt:", error);
    }
  },
  selectSeat(seat) {
  if (seat.status === "booked") return; // Không cho chọn ghế đã đặt
  if (seat.status === "available") {
    seat.status = "selected";
    this.selectedSeats.push(seat.label);
  } else if (seat.status === "selected") {
    seat.status = "available";
    this.selectedSeats = this.selectedSeats.filter(s => s !== seat.label);
  }
},
    bookSeats() {
      if (!this.selectedSeats.length) {
        alert("Vui lòng chọn ít nhất một ghế.");
        return;
      }
      alert(`Đặt vé thành công cho ghế: ${this.selectedSeats.join(", ")}`);
      this.showInfoModal = false;
      this.selectedSeats = [];
    },
    handleBooking() {
    if (!this.isLoggedIn) { 
      alert("Bạn cần đăng nhập để đặt vé!");
      this.$router.push("/login"); // Chuyển hướng sang trang đăng nhập
      return;
    }
    this.showSeatModal = true;
  },
    formatCurrency(value) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    },
    isLoggedIn() {
    return localStorage.getItem("accessToken") !== null; // Kiểm tra xem token có trong localStorage không
  },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("vi-VN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
};
</script>


<style scoped>
.container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.title {
  color: #2c3e50;
}
.seat.booked {
  background-color: #f44336;
  cursor: not-allowed;
}

.car-image {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 20px;
}

.info p {
  font-size: 16px;
  margin: 5px 0;
}

.book-button {
  display: inline-block;
  margin-top: 15px;
  padding: 10px 15px;
  background: #e74c3c;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
}

.book-button:hover {
  background: #c0392b;
}

.back-button {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 15px;
  background: #95a5a6;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

.back-button:hover {
  background: #7f8c8d;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 500px;
}

.seating-chart {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.seating-columns {
  display: flex;
}

.seat-column {
  display: flex;
  flex-direction: column;
  margin-right: 10px;
}

.seat {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid black;
  margin: 2px;
}

.seat.available {
  background-color: #4caf50;
}

.seat.selected {
  background-color: #ffeb3b;
}

.seat.booked {
  background-color: #f44336;
  cursor: not-allowed;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  cursor: pointer;
  height: 40px;
}

.modal-buttons button {
  flex: 1;
  border-radius: 10px;
  margin: 0 5px;
}

.modal-buttons .confirm-button {
  background-color: #4caf50;
  color: white;
}

.modal-buttons .close-button {
  background-color: #f44336;
  color: white;
}

.modal-buttons .confirm-button:hover {
  background-color: #45a049;
}

.modal-buttons .close-button:hover {
  background-color: #e53935;
}
.driver-icon img {
  width: 50px;
  margin-right: 180px;
}
.modal-content {
  width: 500px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  text-align: left;
}

.modal-content h3 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.form-group label {
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input, 
.form-group select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.form-group input:focus, 
.form-group select:focus {
  border-color: #007bff;
  outline: none;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.confirm-button, .close-button {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.confirm-button {
  background-color: #28a745;
  color: white;
  margin-right: 10px;
}

.close-button {
  background-color: #dc3545;
  color: white;
}

.confirm-button:hover {
  background-color: #218838;
}

.close-button:hover {
  background-color: #c82333;
}
</style>
