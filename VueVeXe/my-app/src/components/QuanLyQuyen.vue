<template>
    <div class="quyen-container">
        <button @click="goBack" class="back-button">
      <img src="@/assets/turn-left.png" alt="Back" class="icon" />
      Quay lại
    </button>
      <h1>Danh Sách Quyền</h1>
  
      <!-- Ô tìm kiếm -->
      <div class="search-container">
  <input v-model="searchId" placeholder="Nhập mã quyền để tìm..." />
  <button @click="searchQuyen">Tìm kiếm</button>
  <button @click="resetList">Làm mới</button>
</div>
  
      <div v-if="loading">Đang tải dữ liệu...</div>
      <div v-if="error" class="error">{{ error }}</div>
  
      <!-- Form thêm/sửa quyền -->
      <div class="form-container">
        <input v-model="quyen.TENQUYEN" placeholder="Nhập tên quyền..." />
        <button v-if="!editing" @click="createQuyen">Thêm</button>
        <button v-if="editing" @click="updateQuyen">Lưu</button>
        <button v-if="editing" @click="cancelEdit">Hủy</button>
      </div>
  
      <table v-if="quyenList.length > 0">
        <thead>
          <tr>
            <th>Mã Quyền</th>
            <th>Tên Quyền</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="quyen in quyenList" :key="quyen.MAQUYEN">
            <td>{{ quyen.MAQUYEN }}</td>
            <td>{{ quyen.TENQUYEN }}</td>
            <td>
              <button @click="editQuyen(quyen)">Sửa</button>
              <button @click="deleteQuyen(quyen.MAQUYEN)">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        quyenList: [],
        loading: false,
        error: null,
        searchId: "",
        quyen: { MAQUYEN: "", TENQUYEN: "" },
        editing: false
      };
    },
    methods: {
        goBack() {
    this.$router.push('/admin');
  },
        resetList() {
    this.searchId = ""; // Xóa nội dung tìm kiếm
    this.fetchQuyen();  // Gọi lại danh sách quyền
  },
      // Lấy danh sách quyền
      async fetchQuyen() {
        this.loading = true;
        this.error = null;
        try {
          const response = await axios.get("http://localhost:3000/quyen");
          this.quyenList = response.data;
        } catch (err) {
          this.error = "Không thể tải danh sách quyền!";
        } finally {
          this.loading = false;
        }
      },
  
      // Tìm kiếm quyền theo mã quyền
      async searchQuyen() {
        if (!this.searchId) {
          alert("Vui lòng nhập mã quyền để tìm kiếm!");
    return;
        }
        this.loading = true;
        this.error = null;
        try {
          const response = await axios.get(`http://localhost:3000/quyen/${this.searchId}`);
          this.quyenList = response.data ? [response.data] : [];
        } catch (err) {
          this.error = "Không tìm thấy quyền!";
        } finally {
          this.loading = false;
        }
      },
  
      // Thêm quyền mới
      async createQuyen() {
        if (!this.quyen.TENQUYEN) return alert("Tên quyền không được để trống!");
        try {
          await axios.post("http://localhost:3000/quyen/create", {
            TENQUYEN: this.quyen.TENQUYEN
          });
          this.quyen.TENQUYEN = "";
          this.fetchQuyen();
        } catch (err) {
          this.error = "Lỗi khi thêm quyền!";
        }
      },
  
      // Chọn quyền để chỉnh sửa
      editQuyen(quyen) {
        this.quyen = { ...quyen };
        this.editing = true;
      },
  
      // Cập nhật quyền
      async updateQuyen() {
        if (!this.quyen.TENQUYEN) return alert("Tên quyền không được để trống!");
        try {
          await axios.post(`http://localhost:3000/quyen/update/${this.quyen.MAQUYEN}`, {
            TENQUYEN: this.quyen.TENQUYEN
          });
          this.cancelEdit();
          this.fetchQuyen();
        } catch (err) {
          this.error = "Lỗi khi cập nhật quyền!";
        }
      },
  
      // Xóa quyền
      async deleteQuyen(maquyen) {
        if (!confirm("Bạn có chắc chắn muốn xóa?")) return;
        try {
          await axios.delete(`http://localhost:3000/quyen/delete/${maquyen}`);
          this.fetchQuyen();
        } catch (err) {
          this.error = "Lỗi khi xóa quyền!";
        }
      },
  
      // Hủy chỉnh sửa
      cancelEdit() {
        this.quyen = { MAQUYEN: "", TENQUYEN: "" };
        this.editing = false;
      }
    },
    created() {
      this.fetchQuyen();
    }
  };
  </script>
  
  <style scoped>
  .quyen-container {
    max-width: 800px;
    margin: 20px auto;
    text-align: center;
  }
  
  .search-container, .form-container {
    margin-bottom: 20px;
  }
  
  input {
    padding: 8px;
    margin-right: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    padding: 8px 12px;
    border: none;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    border-radius: 4px;
  }
  
  button:hover {
    background-color: #0056b3;
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
    background-color: #007bff;
    color: white;
  }
  .back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: gray;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.back-button:hover {
  background-color: darkgray;
}
  .error {
    color: red;
    margin-top: 10px;
  }
  </style>
  