<template>
    <div class="container">
      <button @click="goBack" class="back-button">⬅ Quay lại</button>
      <h1>Danh Sách Nhân Viên</h1>
  
      <div class="search-bar">
        <input v-model="searchId" placeholder="Nhập mã nhân viên..." />
        <button @click="searchNhanVien">Tìm kiếm</button>
        <button @click="fetchAllNhanVien">Làm mới</button>
      </div>
  
      <div class="form">
        <h2>{{ isEditing ? "Cập Nhật Nhân Viên" : "Thêm Nhân Viên" }}</h2>
        <input v-model="newNhanVien.TENNV" placeholder="Tên nhân viên..." />
        <input v-model="newNhanVien.MATOCHUC" placeholder="Mã tổ chức..." />
        <label>Giới tính:</label>
<select v-model="newNhanVien.GIOITINH">
  <option value="M">Nam</option>
  <option value="F">Nữ</option>
</select>
        <input v-model="newNhanVien.DIACHI" placeholder="Địa chỉ..." />
        <input v-model="newNhanVien.SODT" placeholder="Số điện thoại..." />
        <input v-model="newNhanVien.CMND" placeholder="CMND/CCCD..." />
        <input v-model="newNhanVien.EMAIL" placeholder="Email..." />
        <label>Mã quyền:</label>
        <select v-model="newNhanVien.MAQUYEN">
        <option v-for="quyen in danhSachQuyen" :key="quyen.MAQUYEN" :value="quyen.MAQUYEN">
          {{ quyen.MAQUYEN }}
        </option>
      </select>
  
        <button @click="isEditing ? updateNhanVien() : createNhanVien()">
          {{ isEditing ? "Cập Nhật" : "Thêm" }}
        </button>
        <button v-if="isEditing" @click="cancelEdit">Hủy</button>
      </div>
  
      <table>
        <thead>
          <tr>
            <th>Mã NV</th>
            <th>Tên NV</th>
            <th>Mã TC</th>
            <th>Giới Tính</th>
            <th>Địa Chỉ</th>
            <th>Số ĐT</th>
            <th>CMND</th>
            <th>Email</th>
            <th>Mã Quyền</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="nhanVien in nhanViens" :key="nhanVien.MANV">
            <td>{{ nhanVien.MANV }}</td>
            <td>{{ nhanVien.TENNV }}</td>
            <td>{{ nhanVien.MATOCHUC }}</td>
            <td>{{ nhanVien.GIOITINH }}</td>
            <td>{{ nhanVien.DIACHI }}</td>
            <td>{{ nhanVien.SODT }}</td>
            <td>{{ nhanVien.CMND }}</td>
            <td>{{ nhanVien.EMAIL }}</td>
            <td>{{ nhanVien.MAQUYEN }}</td>
            <td>
              <button @click="editNhanVien(nhanVien)">Sửa</button>
              <button @click="deleteNhanVien(nhanVien.MANV)">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        danhSachQuyen: [],
        nhanViens: [],
        searchId: "",
        newNhanVien: {
          TENNV: "",
          MATOCHUC: "",
          GIOITINH: "",
          DIACHI: "",
          SODT: "",
          CMND: "",
          EMAIL: "",
          MAQUYEN: "",
        },
        isEditing: false,
        editingId: null,
      };
    },
    methods: {
        async fetchQuyen() {
      const response = await axios.get("http://localhost:3000/quyen");
      this.danhSachQuyen = response.data;
      console.log(this.danhSachQuyen);
    },
      async fetchAllNhanVien() {
        const response = await axios.get("http://localhost:3000/nhanvien");
        this.nhanViens = response.data;
        this.searchId = "";
      },
      async searchNhanVien() {
        if (this.searchId) {
          const response = await axios.get(`http://localhost:3000/nhanvien/${this.searchId}`);
          this.nhanViens = response.data ? [response.data] : [];
        } else {
          alert("Vui lòng nhập mã nhân viên để tìm kiếm!");
    return;
        }
      },
      async createNhanVien() {
        if (!this.newNhanVien.TENNV || !this.newNhanVien.MATOCHUC || !this.newNhanVien.GIOITINH || 
            !this.newNhanVien.DIACHI || !this.newNhanVien.SODT || !this.newNhanVien.CMND || 
            !this.newNhanVien.EMAIL || !this.newNhanVien.MAQUYEN) {
          alert("Vui lòng điền đầy đủ thông tin trước khi thêm!");
          return;
        }
        await axios.post("http://localhost:3000/nhanvien/create", this.newNhanVien);
        this.fetchAllNhanVien();
        this.resetForm();
      },
      async updateNhanVien() {
        await axios.post(`http://localhost:3000/nhanvien/update/${this.editingId}`, this.newNhanVien);
        this.fetchAllNhanVien();
        this.cancelEdit();
      },
      async deleteNhanVien(id) {
        await axios.delete(`http://localhost:3000/nhanvien/delete/${id}`);
        this.fetchAllNhanVien();
      },
      editNhanVien(nhanVien) {
        this.isEditing = true;
        this.editingId = nhanVien.MANV;
        this.newNhanVien = { ...nhanVien };
      },
      cancelEdit() {
        this.isEditing = false;
        this.editingId = null;
        this.resetForm();
      },
      resetForm() {
        this.newNhanVien = {
          TENNV: "",
          MATOCHUC: "",
          GIOITINH: "",
          DIACHI: "",
          SODT: "",
          CMND: "",
          EMAIL: "",
          MAQUYEN: "",
        };
      },
      goBack() {
        this.$router.push("/admin");
      },
    },
    mounted() {
      this.fetchAllNhanVien();
      this.fetchQuyen();
    },
  };
  </script>
  
  <style>
  .container {
    text-align: center;
    padding: 20px;
  }
  
  .search-bar, .form {
    margin: 10px 0;
  }
  
  .back-button {
    position: absolute;
    top: 20px;
    left: 20px;
    background-color: gray;
    color: white;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 10px;
  }
  
  th {
    background-color: blue;
    color: white;
  }
  
  button {
    margin: 5px;
    padding: 8px 12px;
    border: none;
    cursor: pointer;
    background-color: #007bff;
    color: white;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  