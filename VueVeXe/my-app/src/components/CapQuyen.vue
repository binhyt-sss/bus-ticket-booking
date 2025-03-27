<template>
    <div class="container">
      <h2>Cấp quyền tài khoản</h2>
      
      <!-- Nút quay về trang Admin -->
      <button @click="goToAdmin" class="back-button">Quay về trang Admin</button>
  
      <!-- Bảng danh sách tài khoản -->
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Quyền</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.ID">
            <td>{{ user.ID }}</td>
            <td>{{ user.USERNAME }}</td>
            <td>
              <span :class="{'admin-role': user.MAQUYEN === 1, 'user-role': user.MAQUYEN !== 1}">
                {{ user.MAQUYEN === 1 ? "Admin" : "User" }}
              </span>
            </td>
            <td>
              <button 
                @click="kichHoat(user.ID)" 
                :disabled="user.MAQUYEN === 1"
                class="activate-button">
                {{ user.MAQUYEN === 1 ? "Đã kích hoạt" : "Kích hoạt" }}
              </button>
              <button 
    v-if="user.MAQUYEN === 1" 
    @click="huyKichHoat(user.ID)" 
    class="deactivate-button">
    Hủy kích hoạt
  </button>
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
        users: []
      };
    },
    methods: {
      // Lấy danh sách tất cả tài khoản
      async fetchUsers() {
        try {
          const response = await axios.get("http://localhost:3000/user/users");
          this.users = response.data;
        } catch (error) {
          console.error("Lỗi khi tải danh sách tài khoản:", error);
        }
      },
  
      // Kích hoạt tài khoản
      async kichHoat(userId) {
    try {
        console.log("Gửi request kích hoạt cho user ID:", userId); // Debug

        const response = await axios.post("http://localhost:3000/user/kichhoat", {
            id: userId,
            maquyen: 1 // Thêm mã quyền khi kích hoạt
        });

        console.log("Response từ server:", response.data); // Debug
        alert("Tài khoản đã được kích hoạt!");
        this.fetchUsers(); // Load lại danh sách sau khi kích hoạt
    } catch (error) {
        console.error("Lỗi khi kích hoạt tài khoản:", error.response?.data || error.message);
        alert("Có lỗi xảy ra, vui lòng thử lại.");
    }
},
      // Quay về trang Admin
      goToAdmin() {
        this.$router.push("/admin");
      },
      async huyKichHoat(userId) {
    try {
        console.log("Gửi request hủy kích hoạt cho user ID:", userId); // Debug

        const response = await axios.post("http://localhost:3000/user/huykichhoat", {
            id: userId,
            maquyen: 3 // Đặt quyền = 3 khi hủy kích hoạt
        });

        console.log("Response từ server:", response.data); // Debug
        alert("Tài khoản đã bị hủy kích hoạt!");
        this.fetchUsers(); // Load lại danh sách sau khi hủy
    } catch (error) {
        console.error("Lỗi khi hủy kích hoạt tài khoản:", error.response?.data || error.message);
        alert("Có lỗi xảy ra, vui lòng thử lại.");
    }
}
    },
    mounted() {
      this.fetchUsers();
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
    margin: auto;
    text-align: center;
  }
  
  .back-button {
    background-color: #555;
    color: white;
    padding: 10px 15px;
    margin-bottom: 20px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
  }
  
  th {
    background-color: #3911ea;
  }
  .deactivate-button {
    padding: 5px 10px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    background-color: #dc3545;
    color: white;
}
  .activate-button {
    padding: 5px 10px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    background-color: #28a745;
    color: white;
  }
  
  .activate-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  .admin-role {
    color: green;
    font-weight: bold;
  }
  
  .user-role {
    color: red;
    font-weight: bold;
  }
  </style>
  