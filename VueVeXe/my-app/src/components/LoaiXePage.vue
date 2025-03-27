<template>
    <div class="container">
        <button @click="goBack" class="back-button">⬅ Quay lại</button>
      <h2>Quản Lý Loại Xe</h2>
      <div class="search">
        <input v-model="searchText" placeholder="Nhập mã loại xe..." />
        <button @click="searchLoaiXe">Tìm kiếm</button>
        <button @click="getAllLoaiXe">Làm mới</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Mã Loại Xe</th>
            <th>Tên Loại Xe</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="xe in loaiXeList" :key="xe.MALOAIXE">
            <td>{{ xe.MALOAIXE }}</td>
            <td>{{ xe.TENLOAIXE }}</td>
            <td>
              <button @click="editLoaiXe(xe)">Sửa</button>
              <button @click="deleteLoaiXe(xe.MALOAIXE)">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <h3 v-if="editing">Cập nhật Loại Xe</h3>
      <h3 v-else>Thêm Loại Xe</h3>
      <form @submit.prevent="editing ? updateLoaiXe() : addLoaiXe()">
        <input v-model="loaiXeData.TENLOAIXE" placeholder="Tên Loại Xe" required />
        <button type="submit">{{ editing ? "Cập nhật" : "Thêm" }}</button>
        <button v-if="editing" @click="cancelEdit">Hủy</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        loaiXeList: [],
        searchText: "",
        loaiXeData: { TENLOAIXE: "" },
        editing: false,
        editId: null,
      };
    },
    methods: {
      async getAllLoaiXe() {
        
        try {
            this.searchText = "";
          const response = await axios.get("http://localhost:3000/loaixe");
          this.loaiXeList = response.data;
        } catch (error) {
          console.error("Lỗi lấy danh sách loại xe:", error);
        }
      },
      async searchLoaiXe() {
        if (!this.searchText) {
            alert("Vui lòng nhập mã loại xe để tìm kiếm!");
            return;
        }
        try {
          const response = await axios.get(
            `http://localhost:3000/loaixe/${this.searchText}`
          );
          this.loaiXeList = response.data ? [response.data] : [];
        } catch (error) {
          console.error("Lỗi tìm kiếm loại xe:", error);
        }
      },
      async addLoaiXe() {
        try {
          await axios.post("http://localhost:3000/loaixe/create", this.loaiXeData);
          this.loaiXeData.TENLOAIXE = "";
          this.getAllLoaiXe();
        } catch (error) {
          console.error("Lỗi thêm loại xe:", error);
        }
      },
      resetSearch() {
      this.searchText = '';
      this.getAllLoaiXe();
    },
      editLoaiXe(xe) {
        this.loaiXeData.TENLOAIXE = xe.TENLOAIXE;
        this.editing = true;
        this.editId = xe.MALOAIXE;
      },
      async updateLoaiXe() {
        try {
          await axios.post(`http://localhost:3000/loaixe/update/${this.editId}`, {
            TENLOAIXE: this.loaiXeData.TENLOAIXE,
          });
          this.cancelEdit();
          this.getAllLoaiXe();
        } catch (error) {
          console.error("Lỗi cập nhật loại xe:", error);
        }
      },
      async deleteLoaiXe(id) {
        if (!confirm("Bạn có chắc muốn xóa loại xe này?")) return;
        try {
          await axios.delete(`http://localhost:3000/loaixe/delete/${id}`);
          this.getAllLoaiXe();
        } catch (error) {
          console.error("Lỗi xóa loại xe:", error);
        }
      },
      goBack() {
        this.$router.push("/admin");
      },
      cancelEdit() {
        this.editing = false;
        this.editId = null;
        this.loaiXeData.TENLOAIXE = "";
      },
    },
    mounted() {
      this.getAllLoaiXe();
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
    margin: auto;
    text-align: center;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
  }
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  th {
    background-color: #007bff;
    color: white;
  }
  button {
    margin: 5px;
    padding: 5px 10px;
    border: none;
    cursor: pointer;
  }
  button:hover {
    opacity: 0.8;
  }
  </style>
  