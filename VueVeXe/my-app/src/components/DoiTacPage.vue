<template>
  <div>
    <section class="banner relative">
      <img src="@/assets/banner.png" alt="Banner" class="w-full h-auto" />
      <div class="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50">
        <h2 class="text-4xl font-extrabold text-white">🤝 Trao niềm tin nhận tài lộc 💵</h2>

        <!-- Combobox chọn loại xe -->
        
      </div>
    </section>
    <div class="mt-4">
      <label for="loaixe" class="text-white font-semibold">Chọn loại xe:</label>
      <select
        id="loaixe"
        v-model="selectedLoaiXe"
        class="mt-2 p-2 rounded border border-gray-300"
      >
        <option v-for="loaixe in danhSachLoaiXe" :key="loaixe.MALOAIXE" :value="loaixe.MALOAIXE">
          {{ loaixe.TENLOAIXE }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      danhSachLoaiXe: [], // Danh sách loại xe từ API
      selectedLoaiXe: null, // Loại xe được chọn
    };
  },
  async created() {
    try {
      const response = await axios.get("http://localhost:3000/loaixe");
      if (Array.isArray(response.data)) {
        this.danhSachLoaiXe = response.data; // Gán dữ liệu nếu là mảng
      } else {
        this.danhSachLoaiXe = [response.data]; // Nếu là object, chuyển thành mảng
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách loại xe:", error);
    }
  },
};
</script>
