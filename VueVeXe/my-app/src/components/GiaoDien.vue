<template>
  <div class="homepage-container">
    <header class="header bg-blue-600 text-white p-4">
  <div class="container mx-auto flex items-center justify-between">
    <div class="flex items-center space-x-2">
      <img @click="goHome" src="@/assets/logo.jpg" alt="VeXeRe Logo" class="logo" />
    </div>
    <div class="flex items-center space-x-2">
      <h1 class="text-2xl font-bold">VeXeNhanh</h1>
    </div>
    <nav class="flex items-center space-x-4">
  <a href="#" class="flex items-center space-x-2 hover:underline">
    <img src="@/assets/home.png" alt="Home" class="icon1" />
    <span>TRANG CHỦ</span>
  </a>
  <a href="#" class="flex items-center space-x-2 hover:underline">
    <img src="@/assets/info-button.png" alt="About" class="icon1" />
    <span>VỀ CHÚNG TÔI</span>
  </a>
  <a href="#" class="flex items-center space-x-2 hover:underline">
    <img src="@/assets/mobile.png" alt="Contact" class="icon1" />
    <span>LIÊN HỆ</span>
  </a>
</nav>
<div class="flex items-center ml-auto space-x-4">
  <button class="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200 flex items-center space-x-2">
    <img src="@/assets/exit.png" alt="Login Icon" class="icon1" />
    <span>ĐĂNG NHẬP</span>
  </button>
  <button class="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200 flex items-center space-x-2">
    <img src="@/assets/add-user.png" alt="Register Icon" class="icon1" />
    <span>ĐĂNG KÝ</span>
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
            <v-select :options="locations" v-model="from" placeholder="Chọn điểm đi" class="custom-select"></v-select>
          </div>
          <div>
            <label for="to" class="block font-medium text-black">Điểm đến</label>
            <v-select :options="locations" v-model="to" placeholder="Chọn điểm đến" class="custom-select"></v-select>
          </div>
          <div>
            <label for="date" class="block font-medium text-black">Ngày đi</label>
            <input id="date" type="date" v-model="date" class=" custom-date-input w-full border p-2 rounded" placeholder="mm/dd/yyyy" />
          </div>
          <button @click="searchBuses" class="custom-search-btn flex items-center justify-center">
            <img src="@/assets/search.png" alt="Search Icon" class="icon" />
            <span class="block font-medium text-black" >Tìm Xe</span>
          </button>
        </div>
      </div>
    </section>

    <main class="main-content">
      <section class="featured-section py-10" v-if="!isSearching">
        <div class="container mx-auto">
          <h3 class="text-2xl font-semibold mb-6">Nhà xe nổi bật</h3>
          <div class="flex flex-wrap justify-center gap-6">
            <div v-for="bus in buses" :key="bus.id" class="bus-card bg-white rounded-lg shadow-md p-4">
              <img src="@/assets/xe-phuong-trang-7.png" alt="Bus Icon" class="img" />
              <h4 class="font-bold text-lg">{{ bus.name }}</h4>
              <p class="text-gray-600">{{ bus.description }}</p>
              <p class="text-gray-700">
                <strong>Tuyến đường:</strong> {{ bus.route.from }} - {{ bus.route.to }}
              </p>
              <p class="text-gray-700">
                <strong>Thời gian dự kiến:</strong> {{ bus.route.estimatedTime }}
              </p>
              <router-link :to="{ name: 'Detail', params: { id: bus.id } }" class="mt-4 bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700 flex items-center justify-center">
                <img src="@/assets/side-menu.png" alt="Details Icon" class="icon" /> 
                <span class = text-black > Xem chi tiết</span>
              </router-link>
            </div>
          </div>
        </div>
      </section>

      <section class="search-results py-10" v-if="isSearching">
        <div class="container mx-auto">
          <h3 class="text-2xl font-semibold mb-6">Kết quả tìm kiếm</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div v-for="bus in filteredBuses" :key="bus.id" class="bus-card bg-white rounded-lg shadow-md p-4">
              <img src="@/assets/xe-phuong-trang-7.png" alt="Bus Icon" class="img" />
              <h4 class="font-bold text-lg">{{ bus.name }}</h4>
              <p class="text-gray-600">{{ bus.description }}</p>
              <p class="text-gray-700">
                <strong>Tuyến đường:</strong> {{ bus.route.from }} - {{ bus.route.to }}
              </p>
              <p class="text-gray-700">
                <strong>Thời gian dự kiến:</strong> {{ bus.route.estimatedTime }}
              </p>
              <router-link :to="{ name: 'Detail', params: { id: bus.id } }" class="mt-4 bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700 flex items-center justify-center">
                <img src="@/assets/side-menu.png" alt="Details Icon" class="icon" />
                <span class = text-black > Xem chi tiết</span>
              </router-link>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer bg-gray-800 text-black py-4">
      <div class="container mx-auto text-center">
        <p>&copy; 2025 VeXeRe. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>
import vSelect from "vue-select";
import axios from "axios";
import 'vue-select/dist/vue-select.css';

export default {
  components: { vSelect },
  data() {
    return {
      from: null,
      to: null,
      date: null,
      locations: [],
      buses: [],
      filteredBuses: [],
      isSearching: false,
    };
  },
  mounted() {
    this.fetchLocations();
    this.fetchBuses();
  },
  methods: {
    async fetchLocations() {
      try {
        const response = await axios.get("https://provinces.open-api.vn/api/?depth=1");
        this.locations = response.data.map((location) => location.name);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    },
    async fetchBuses() {
      this.isSearching = true;
      try {
        const response = await fetch("URL_API_CUA_BAN");
        const data = await response.json();
  
        console.log("Dữ liệu API:", data); // Kiểm tra dữ liệu trả về
  
        // Kiểm tra nếu API trả về một object hay array
        if (Array.isArray(data)) {
          this.buses = data.map(bus => ({
            TEN: bus.TENXE,
            ANH: bus.ANHXE,
            DIEMDI: bus.DIEMDI,
            DIEMDEN: bus.DIEMDEN
          }));
        } else {
          this.buses = [{
            TEN: data.TENXE,
            ANH: data.ANHXE,
            DIEMDI: data.DIEMDI,
            DIEMDEN: data.DIEMDEN
          }];
        }
  
        console.log("Danh sách xe sau khi xử lý:", this.buses); // Debug kết quả
  
        this.filteredBuses = this.buses; 
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu xe:", error);
      } finally {
        this.isSearching = false;
      }
    },
    searchBuses() {
      const currentDate = new Date();
      const selectedDate = new Date(this.date);
  
      if (!this.from || !this.to) {
        alert("Vui lòng chọn cả điểm đi và điểm đến.");
        return;
      }
  
      if (!this.date) {
        alert("Vui lòng chọn ngày đi.");
        return;
      }
  
      if (selectedDate <= currentDate) {
        alert("Ngày đi phải lớn hơn ngày hiện tại.");
        return;
      }
  
      this.filteredBuses = this.buses.filter(bus => bus.DIEMDI === this.from && bus.DIEMDEN === this.to);
  
      if (this.filteredBuses.length === 0) {
        alert("Không tìm thấy xe phù hợp.");
      } else {
        this.isSearching = true; // Cập nhật trạng thái khi tìm kiếm thành công
      }
    },
    goHome() {
      this.isSearching = false; // Quay về trạng thái ban đầu
    }
  },
// mounted() {
//   this.fetchBuses(); // Gọi API khi trang tải
// }

    // searchBuses() {
    //   const currentDate = new Date();
    //   const selectedDate = new Date(this.date);

    //   if (!this.from || !this.to) {
    //     alert("Vui lòng chọn cả điểm đi và điểm đến.");
    //     return;
    //   }

    //   if (!this.date) {
    //     alert("Vui lòng chọn ngày đi.");
    //     return;
    //   }

    //   if (selectedDate <= currentDate) {
    //     alert("Ngày đi phải lớn hơn ngày hiện tại.");
    //     return;
    //   }

    //   this.filteredBuses = this.buses.filter(bus => bus.route.from === this.from && bus.route.to === this.to);

    //   if (this.filteredBuses.length === 0) {
    //     alert("Không tìm thấy xe phù hợp.");
    //   } else {
    //     this.isSearching = true; // Cập nhật trạng thái khi tìm kiếm thành công
    //   }
    // },
    goHome() {
      this.isSearching = false; // Quay về trạng thái ban đầu
    },
};
</script>

<style scoped>
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
  color: black; /* Màu chữ đen */
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
  background-color: #f3f4f6; /* Nền khi hover */
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
</style>
