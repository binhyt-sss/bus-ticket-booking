<template>
   <div class="homepage-container">
    <header class="header bg-blue-600 text-white p-4">
  <div class="container mx-auto flex items-center justify-between">
    <div class="flex items-center space-x-2">
      <img @click="redirectToXe" src="@/assets/logo.jpg" alt="Logo" style="cursor: pointer;" class="logo" />
    </div>
    <div class="flex items-center space-x-2">
      <h1 class="text-2xl font-bold">VeXeNhanh</h1>
    </div>
    <nav class="flex items-center space-x-4">
  <a href="#" class="flex items-center space-x-2 hover:underline">
    <img @click="redirectToXe" src="@/assets/home.png" alt="Home" class="icon1" />
    <span @click="redirectToXe">TRANG CHỦ</span>
  </a>
  <a href="#" class="flex items-center space-x-2 hover:underline">
    <img src="@/assets/info-button.png" alt="About" class="icon1" />
    <span>VỀ CHÚNG TÔI</span>
  </a>
  <a href="#" class="flex items-center space-x-2 hover:underline">
    <img src="@/assets/mobile.png" alt="Contact" class="icon1" />
    <span>LIÊN HỆ</span>
  </a>
  <router-link to="/hoptac" class="flex items-center space-x-2 hover:underline">
          <img src="@/assets/handshake.png" alt="Ticket" class="icon1" />
          <span>TRỞ THÀNH ĐỐI TÁC</span>
        </router-link>
        
        <router-link 
  v-if="isLoggedIn" 
  to="/ticket" 
  class="flex items-center space-x-2 hover:underline"
>
  <img src="@/assets/ticket.png" alt="Ticket" class="icon1" />
  <span>QUẢN LÝ VÉ</span>
</router-link>

<span v-else @click="showLoginAlert" class="cursor-pointer text-red-500">
  <img src="@/assets/ticket.png" alt="Ticket" class="icon1" />
  <span>QUẢN LÝ VÉ</span>
</span>

</nav>

<div v-if="!isLoggedIn">
  <div class="flex items-center ml-auto space-x-4">
  <router-link to="/login" class="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200 flex items-center space-x-2">
    <button>
      <img src="@/assets/exit.png" alt="Login Icon" class="icon1" />
      <span>ĐĂNG NHẬP</span>
    </button>
  </router-link>
  <router-link to="/regis" class="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200 flex items-center space-x-2">
    <button>
      <img src="@/assets/add-user.png" alt="Register Icon" class="icon1" />
      <span>ĐĂNG KÝ</span>
    </button>
  </router-link>
  </div>
</div>

<div v-else>
    <span>Xin chào, {{ username }}</span>
      <button @click="logout" class="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200 flex items-center space-x-2">Đăng xuất
        <img src="@/assets/logout.png" alt="Register Icon" class="icon1" />
      </button>
</div>
  </div>
</header>

<section class="banner relative">
      <img src="@/assets/banner.png" alt="Banner" class="w-full h-auto" />
      <div class="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50">
        <h2 class="text-4xl font-extrabold text-white ">Đặt vé xe nhanh chóng và tiện lợi</h2>
        <div class="flex space-x-4 mt-6 bg-white bg-opacity-75 p-4 rounded-lg">
          <div class="w-64">
            <label for="from" class="block font-medium text-black">Điểm đi</label>
            <v-select
      :options="diemDiList"
      v-model="from"
      placeholder="Chọn điểm đi"
      class="custom-select "
      label="name"
    ></v-select>
          </div>
          <div>
            <label for="to" class="block font-medium text-black">Điểm đến</label>
            <v-select
      :options="diemDenList"
      v-model="to"
      placeholder="Chọn điểm đến"
      class="custom-select"
      label="name"
    ></v-select>
          </div>
          <div>
            <label for="date" class="block font-medium text-black">Ngày đi</label>
            <input id="date" type="date" v-model="date" class=" custom-date-input w-full border p-2 rounded" placeholder="mm/dd/yyyy" />
          </div>
          <button @click="fetchXe" class="custom-search-btn flex items-center justify-center">
            <img src="@/assets/search.png" alt="Search Icon" class="icon" />
            <span class="block font-medium text-black" >Tìm Xe</span>
          </button>
        </div>
      </div>
      
    </section>

    <!-- Tiêu đề -->
    <h1 class="text-2xl font-bold mb-4 text-center">Danh Sách Xe Nổi Bật</h1>

    <!-- Trạng thái tải dữ liệu -->
    <div v-if="loading" class="text-gray-500 text-center">Đang tải dữ liệu...</div>
    <div v-else-if="error" class="text-red-500 text-center">{{ error }}</div>
    


    <div class="bus-list">
    <div v-for="xe in filteredXe" :key="xe.MAXE" class="bus-card">

      <img :src="xe.ANHXE" :alt="xe.TENXE" class="bus-image" />
      <div class="bus-info">
        <h3>{{ xe.TENXE }}</h3>
        <p><strong>Loại xe:</strong> {{ xe.TENLOAIXE }}</p>
        <p><strong>Điểm đi:</strong> {{  xe.DIEMDI }}</p>
        <p><strong>Điểm đến:</strong> {{ xe.DIEMDEN }}</p>
        <p class="price"><strong>Giá:</strong> {{ formatCurrency(xe.BANGGIA) }}</p>
        <router-link :to="{ name: 'CarDetail', params: { id: xe.MAXE } }">
        Chi tiết xe
      </router-link>
      </div>
    </div>
  </div>
  <footer class="footer bg-gray-800 text-black py-4">
      <div class="container mx-auto text-center">
        <p>&copy; 2025 VeXeRe. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>

import axios from 'axios';
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  components: {
    vSelect,
  },
  data() {
    return {
      username: localStorage.getItem("username") || "",
      date: null,
      from: null,  // Giá trị điểm đi
      to: null,
      diemDiList: [], // Danh sách điểm đi
      diemDenList: [], // Danh sách điểm đến
      danhSachXe: [],
      searchQuery: "",
      loading: true,
      error: null,
      searchDate: "",
      today: new Date().toISOString().split("T")[0],
    };
  },
  created() {
    // Kiểm tra trạng thái đăng nhập
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.isLoggedIn = true;
      this.username = user.username;
    }
    this.checkLoginStatus();
  },
  computed: {
    filteredXe() {
      return this.danhSachXe.filter((xe) => {
        return (
          (!this.searchDiemDi || xe.DIEMDI === this.searchDiemDi) &&
          (!this.searchDiemDen || xe.DIEMDEN === this.searchDiemDen)
        );
      });
    },
    isLoggedIn() {
      return this.username !== "";
    }
  },
  mounted() {
    const storedUser = localStorage.getItem('username');
    if (storedUser) {
      this.username = storedUser;
      this.isLoggedIn = true;
    }
    // this.fetchXe();
    this.fetchDiemDi();
    this.fetchDiemDen();
    console.log("Diem Di List:", this.diemDiList);
    console.log("Diem Den List:", this.diemDenList);

    axios.get('http://localhost:3000/xe')
      .then(response => {
        this.danhSachXe = response.data;
      })
      .catch(error => {
        this.error = "Không thể tải dữ liệu";
        console.error(error);
      })
      .finally(() => {
        this.loading = false;
      });
  },
  methods: {
    showLoginAlert() {
    alert("Bạn cần đăng nhập để truy cập quản lý vé!");
    this.$router.push("/login");
  },
    logout() {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('username');
      localStorage.removeItem("userRole");
      this.isLoggedIn = false;
      this.username = ""; 
      this.$router.push('/login');
    },
    redirectToXe() {
      window.location.href = "http://localhost:8080/";
    },
  async fetchDiemDi() {
    try {
      const response = await axios.get("http://localhost:3000/tuyenxe/diemdi");
      this.diemDiList = response.data.map((item) => ({
        name: item.DIEMDI, // Chỉ lấy DIEMDI
      }));
    } catch (error) {
      console.error("Lỗi khi tải danh sách điểm đi:", error);
    }
  },
  async fetchDiemDen() {
    try {
      const response = await axios.get("http://localhost:3000/tuyenxe/diemden");
      this.diemDenList = response.data.map((item) => ({
        name: item.DIEMDEN, // Chỉ lấy DIEMDEN
      }));
    } catch (error) {
      console.error("Lỗi khi tải danh sách điểm đến:", error);
    }
  },
  checkLoginStatus() {
      const token = localStorage.getItem('accessToken');
      const storedUsername = localStorage.getItem('username');

      if (token && storedUsername) {
        this.isLoggedIn = true;
        this.username = storedUsername;
      }
    },
  formatCurrency(value) {
      return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
    },
    kiemTraNgay() {
    if (!this.date) {
      alert("Vui lòng chọn ngày khởi hành!");
      return false;
    }

    const ngayHienTai = new Date();
    const ngayChon = new Date(this.date);

    // So sánh ngày chọn với ngày hiện tại
    if (ngayChon <= ngayHienTai) {
      alert("Ngày khởi hành phải lớn hơn ngày hiện tại!");
      return false;
    }

    return true;
  },
  async fetchXe() {
  if (!this.from || !this.to) {
    alert("Vui lòng chọn điểm đi và điểm đến!");
    return;
  }

  console.log("🚀 Trước khi gửi request, kiểu dữ liệu:");
  console.log("this.from:", this.from, " - Kiểu:", typeof this.from);
  console.log("this.to:", this.to, " - Kiểu:", typeof this.to);

  if (!this.kiemTraNgay()) {
       return;
     }

  try {
    // Kiểm tra nếu this.from hoặc this.to là object, cần lấy giá trị cụ thể
    const diemDi = typeof this.from === "object" ? this.from.name : this.from;
    const diemDen = typeof this.to === "object" ? this.to.name : this.to;

    console.log("🔍 URL gửi:", `http://localhost:3000/xe/timchuyen?diemDi=${diemDi}&diemDen=${diemDen}`);

    const response = await axios.get("http://localhost:3000/xe/timchuyen", {
      params: { diemDi: diemDi.trim(), diemDen: diemDen.trim() },
      headers: { "Content-Type": "application/json" }
    });

    console.log("✅ API Response:", response.data);

    if (!response.data || response.data.length === 0) {
      alert("Không tìm thấy chuyến xe nào!");
      return;
    }
    else{
      alert("Đã tìm thấy chuyến xe!");
    }

    this.danhSachXe = response.data;
  } catch (error) {
    console.error("❌ Lỗi khi gọi API:", error);
    if (error.response) {
      console.error("📌 Chi tiết lỗi API:", error.response.data);
      alert(`Lỗi API: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
    } else {
      alert("Đã xảy ra lỗi không xác định. Vui lòng thử lại!");
    }
  }
}

}
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.homepage-container {
  font-family: Arial, sans-serif;
}
.container {
  margin: 0;
  padding: 0;
}
.header {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  background-color: #4aa1df;
  margin-top: 0;
}
.icon {
  height: 15px;
  width: auto;
}
.icon1 {
  height: 25px;
  width: auto;
}
.header .container {
  display: flex;
  align-items: center; /* Căn thẳng hàng tất cả các thành phần trong header */
  justify-content: space-between;
  gap: 1rem;
  margin: 0;
  padding: 0;
}
nav {
  align-items: center;
  display: flex;
  gap: 1rem; /* Thêm khoảng cách giữa các item trong nav */
}
.search-form {
  max-width: 800px;
}
.bus-card {
  transition: transform 0.2s;
  text-align: center;
}
.bus-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

nav a {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black;
}
.logo {
  height: 120px; /* Chiều cao 20px */
  width: 150px;  /* Tự động điều chỉnh chiều rộng theo tỉ lệ */
}
.img {
  height: 175px;
  width: auto;
}
button {
  background-color: white;
  margin-left: 10px;
  color: #1d4ed8;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s; 
}
button:hover {
  background-color: #f3f4f6; /* Màu xám nhạt */
}
.banner {
  background-size: cover;
  width: 100%;
  background-position: center;
  text-align: center;
  position: relative;
  padding: 0.5rem 0; /* Khoảng cách trên dưới của banner */
}
.banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.banner .icon {
  height: 20px;
  width: auto;
}

.absolute {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.flex-col {
  flex-direction: column;
}
.flex {
  display: flex;
}
.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.space-x-4 > * + * {
  margin-left: 1rem;
}

.text-white {
  color: white;
}

.mt-4 {
  margin-top: 1rem;
}

.mt-6 {
  margin-top: 1.5rem;
}

.bg-opacity-50 {
  background-color: rgba(0, 0, 0, 0.5); /* Nền mờ nhẹ */
}

.bg-opacity-75 {
  background-color: rgba(255, 255, 255, 0.75); /* Nền mờ nhẹ cho form */
}

.text-black {
  color: black;
}

.text-4xl {
  font-size: 2.25rem; /* Kích thước chữ lớn hơn */
}

.font-extrabold {
  font-weight: 800; /* Độ đậm của chữ tiêu đề */
}

.p-4 {
  padding: 1rem;
}

.rounded-lg {
  border-radius: 0.5rem;
}
.vs__search, .vs__search:focus {
  width: 10 !important; 
}

.custom-select {
  width: 200px; /* Điều chỉnh độ rộng */
}

.custom-select .vs__dropdown-toggle {
  height: 3rem; /* Chiều cao combobox */
  font-size: 1rem; /* Kích thước chữ */
  padding: 0.5rem; /* Khoảng cách padding */
}

.custom-select .vs__search {
  font-size: 1rem; /* Kích thước chữ khi tìm kiếm */
}

.custom-select .vs__selected {
  font-size: 1rem; /* Kích thước chữ của lựa chọn */
}
.custom-select .vs__dropdown-menu {
  background-color: white; /* Nền trắng */
  color: black ; /* Màu chữ đen */
  font-size: 1rem; /* Kích thước chữ */
  max-height: 300px; /* Chiều cao tối đa dropdown */
  overflow-y: auto; /* Thêm cuộn nếu danh sách dài */
  border: 1px solid #ddd; /* Viền xung quanh */
}

.custom-select .vs__dropdown-option {
  padding: 0.5rem 1rem; /* Khoảng cách trong từng option */
  cursor: pointer; /* Hiệu ứng khi hover */
}

.custom-select .vs__dropdown-option--selected {
  background-color: #4aa1df; /* Màu nền khi được chọn */
  color: white; /* Màu chữ khi được chọn */
}

.custom-select .vs__dropdown-option:hover {
  background-color: #175be3; /* Nền khi hover */
}
.custom-search-box {
  border: 2px solid #4aa1df; /* Viền xanh nhạt */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Đổ bóng nhẹ */
}

/* Custom input chọn ngày */
.custom-date-input {
  border: 1px solid #ccc; /* Viền xám nhạt */
  font-size: 1rem; /* Cỡ chữ vừa phải */
  padding: 0.75rem; /* Tăng padding */
  transition: border-color 0.3s ease, box-shadow 0.3s ease; /* Hiệu ứng hover */
}
.custom-date-input:focus {
  border-color: #4aa1df; /* Đổi màu viền khi focus */
  box-shadow: 0 0 5px rgba(74, 161, 223, 0.5); /* Đổ bóng khi focus */
  outline: none; /* Bỏ khung viền mặc định */
}

/* Nút tìm vé */
.custom-search-btn {
  background-color: #4aa1df; /* Nền xanh đậm */
  color: white; /* Màu chữ trắng */
  padding: 0.75rem 1.5rem; /* Khoảng cách nút */
  border-radius: 2rem; /* Bo tròn nút */
  font-size: 1rem; /* Kích thước chữ */
  font-weight: bold; /* Chữ đậm */
  transition: background-color 0.3s ease, transform 0.2s ease; /* Hiệu ứng hover */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Đổ bóng nút */
}
.custom-search-btn:hover {
  background-color: #3583b7; /* Nền xanh đậm hơn khi hover */
  transform: translateY(-3px); /* Nút nhấc lên khi hover */
}
.custom-search-btn:active {
  transform: translateY(0); /* Nút quay lại vị trí khi nhấn */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3); /* Đổ bóng khi nhấn */
}

/* Icon trong nút tìm kiếm */
.custom-search-btn .icon {
  height: 20px; /* Kích thước icon */
  width: auto;
}
.bus-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  border: 2px solid transparent;
}

.bus-image {
  width: 100%;
  height: 180px; /* Giữ tất cả ảnh cùng chiều cao */
  object-fit: contain; /* Hiển thị toàn bộ ảnh mà không bị cắt */
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  background-color: #f8f8f8; /* Thêm nền sáng nếu ảnh không đủ che hết */
}

/* .bus-info {
  padding: 0.8rem;
  text-align: center;
} */

.bus-name {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #333;
}
.bus-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 item trên mỗi hàng */
  gap: 16px; /* Khoảng cách giữa các thẻ */
  padding: 16px;
}

.bus-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.bus-info {
  padding: 12px;
  text-align: center;
}
.price {
  color: red;
  font-weight: bold;
}
</style>
