<template>
    <div class="container">
        <button @click="goBack" class="back-button">⬅ Quay lại</button>
      <h2>Quản Lý Tài Xế</h2>
      <!-- Tìm kiếm tài xế -->
      <div class="search-box">
        <input v-model="searchQuery" placeholder="Nhập mã tài xế để tìm..." />
        <button @click="searchTaiXe">Tìm kiếm</button>
        <button @click="resetSearch">Làm mới</button>
      </div>
  
      <!-- Form thêm & chỉnh sửa tài xế -->
      <div class="form-box">
        <h3>{{ isEditing ? 'Chỉnh Sửa Tài Xế' : 'Thêm Mới Tài Xế' }}</h3>
        <input v-model="taiXe.TENTX" placeholder="Tên tài xế" />
        <input v-model="formattedDate" type="date" placeholder="Ngày sinh" />
        <select v-model="taiXe.GIOITINH">
          <option value="M">Nam</option>
          <option value="F">Nữ</option>
        </select>
        <input v-model="taiXe.DIACHI" placeholder="Địa chỉ" />
        <input v-model="taiXe.SODT" placeholder="Số điện thoại" />
        <input v-model="taiXe.CMND" placeholder="CMND" />
        <input v-model="taiXe.EMAIL" placeholder="Email" />
        <label>Mã xe:</label>
        <select v-model="taiXe.MAXE">
          <option v-for="xe in danhSachXe" :key="xe.MAXE" :value="xe.MAXE">
            {{ xe.MAXE }}
          </option>
        </select>
        <button @click="isEditing ? updateTaiXe() : createTaiXe()">
          {{ isEditing ? 'Cập nhật' : 'Thêm' }}
        </button>
        <button v-if="isEditing" @click="cancelEdit">Hủy</button>
      </div>
  
      <!-- Bảng danh sách tài xế -->
      <table>
        <thead>
          <tr>
            <th>Mã TX</th>
            <th>Tên TX</th>
            <th>Ngày sinh</th>
            <th>Giới tính</th>
            <th>Địa chỉ</th>
            <th>SĐT</th>
            <th>CMND</th>
            <th>Email</th>
            <th>Mã xe</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tx in danhSachTaiXe" :key="tx.MATAIXE">
            <td>{{ tx.MATAIXE }}</td>
            <td>{{ tx.TENTX }}</td>
            <td>{{ tx.NGAYSINH.split('T')[0] }}</td>
            <td>{{ tx.GIOITINH === 'M' ? 'Nam' : 'Nữ' }}</td>
            <td>{{ tx.DIACHI }}</td>
            <td>{{ tx.SODT }}</td>
            <td>{{ tx.CMND }}</td>
            <td>{{ tx.EMAIL }}</td>
            <td>{{ tx.MAXE }}</td>
            <td>
              <button @click="editTaiXe(tx)">Sửa</button>
              <button @click="deleteTaiXe(tx.MATAIXE)">Xóa</button>
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
      danhSachTaiXe: [],
      danhSachXe: [],
      searchQuery: '',
      selectedDriver: {},
      taiXe: {
        MATAIXE: '',
        TENTX: '',
        NGAYSINH: '',
        GIOITINH: 'M',
        DIACHI: '',
        SODT: '',
        CMND: '',
        EMAIL: '',
        MAXE: ''
      },
      isEditing: false,
      editingId: null,
    };
  },
  mounted() {
    this.fetchTaiXe();
    this.fetchXe();
  },
  computed: {
    formattedDate: {
        get() {
            console.log("Dữ liệu tài xế hiện tại:", this.selectedDriver);
            return this.selectedDriver?.NGAYSINH 
                ? this.selectedDriver.NGAYSINH.split('T')[0] // Lấy phần yyyy-mm-dd
                : '';
        },
        set(value) {
            this.selectedDriver.NGAYSINH = value;
        }
    }
},
  methods: {
    async fetchTaiXe() {
      try {
        const res = await axios.get('http://localhost:3000/taixe');
        console.log("Dữ liệu tài xế:", res.data); // Kiểm tra dữ liệu trả về
        this.selectedDriver = res.data || {}; 
        this.danhSachTaiXe = res.data;
      } catch (error) {
        console.error('Lỗi khi tải tài xế:', error);
      }
    },
    async fetchXe() {
      try {
        const res = await axios.get('http://localhost:3000/xe');
        this.danhSachXe = res.data;
      } catch (error) {
        console.error('Lỗi khi tải xe:', error);
      }
    },
    async searchTaiXe() {
      if (this.searchQuery) {const res = await axios.get(`http://localhost:3000/taixe/${this.searchQuery}`);
        this.danhSachTaiXe = res.data ? [res.data] : [];}
      else{
        alert("Vui lòng nhập mã tài xế để tìm kiếm!");
    return;
      }
    },
    resetSearch() {
      this.searchQuery = '';
      this.fetchTaiXe();
    },
    async createTaiXe() {
  // Kiểm tra nếu có trường nào bị bỏ trống
  if (
    !this.taiXe.TENTX ||
    !this.formattedDate ||
    !this.taiXe.GIOITINH ||
    !this.taiXe.DIACHI ||
    !this.taiXe.SODT ||
    !this.taiXe.CMND ||
    !this.taiXe.EMAIL ||
    !this.taiXe.MAXE
  ) {
    alert("Vui lòng nhập đầy đủ thông tin trước khi thêm tài xế!");
    return;
  }

  this.taiXe.NGAYSINH = this.formattedDate;

  try {
    await axios.post("http://localhost:3000/taixe/create", this.taiXe);
    this.fetchTaiXe();
    this.resetForm();
  } catch (error) {
    console.error("Lỗi khi thêm tài xế:", error);
  }
},
    async updateTaiXe() {
        this.taiXe.NGAYSINH = this.formattedDate;
      try {
        await axios.post(`http://localhost:3000/taixe/update/${this.editingId}`, this.taiXe);
        this.fetchTaiXe();
        this.cancelEdit();
        this.resetForm();
      } catch (error) {
        console.error('Lỗi khi cập nhật tài xế:', error);
      }
    },
    async deleteTaiXe(id) {
      if (confirm('Bạn có chắc chắn muốn xóa tài xế này?')) {
        try {
          await axios.delete(`http://localhost:3000/taixe/delete/${id}`);
          this.fetchTaiXe();
        } catch (error) {
          console.error('Lỗi khi xóa tài xế:', error);
        }
      }
    },
    editTaiXe(tx) {
      this.taiXe = { ...tx };
      console.log("Chọn tài xế:", tx);
      this.formattedDate = tx.NGAYSINH.split('T')[0];
      this.isEditing = true;
      this.editingId = tx.MATAIXE;
      console.log("Dữ liệu tài xế khi chỉnh sửa:", this.taiXe);
    },
    goBack() {
        this.$router.push("/admin");
      },
    
    resetForm() {
      this.taiXe = {
        MATAIXE: '',
        TENTX: '',
        NGAYSINH: '',
        GIOITINH: 'M',
        DIACHI: '',
        SODT: '',
        CMND: '',
        EMAIL: '',
        MAXE: ''
      };
      this.isEditing = false;
      this.formattedDate = '';
    },
    cancelEdit() {
        this.isEditing = false;
        this.editingId = null;
        this.resetForm();
      },
  }
};
</script>
<style scoped>
.container {
  max-width: 900px;
  margin: auto;
  padding: 20px;
}
h2 {
  text-align: center;
}
.search-box, .form-box {
  margin-bottom: 20px;
}
input, select, button {
  margin: 5px;
  padding: 8px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
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
th {
  background-color: #007BFF;
  color: white;
}
button {
  cursor: pointer;
  background-color: #28a745;
  color: white;
  border: none;
  padding: 5px 10px;
  margin: 2px;
}
button:hover {
  opacity: 0.8;
}
</style>
  