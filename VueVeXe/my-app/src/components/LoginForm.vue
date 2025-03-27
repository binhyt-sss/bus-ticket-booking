<template>
  <div class="login-container">
    <h2><i class="fa fa-bus" aria-hidden="true"></i> Đăng nhập</h2>
    <form @submit.prevent="handleLogin">
      <div class="input-group">
        <label for="username">
          <i class="fa fa-user"></i> Tên đăng nhập:
        </label>
        <input type="text" id="username" v-model="username" required />
      </div>

      <div class="input-group">
        <label for="password">
          <i class="fa fa-lock"></i> Mật khẩu:
        </label>
        <input type="password" id="password" v-model="password" required />
      </div>

      <button type="submit">
        <i class="fa fa-sign-in"></i> Đăng nhập
      </button>
    </form>
    <p class="switch-text">
      Chưa có tài khoản?
      <router-link to="/regis">Đăng ký</router-link>
    </p>
  </div>
</template>

<script>
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post("http://localhost:3000/user/users/login", {
          username: this.username,
          password: this.password,
        });

        console.log("Dữ liệu nhận từ API:", response.data);

        if (response.data && response.data.token) {
          localStorage.setItem("accessToken", response.data.token);
          localStorage.setItem("userRole", response.data.user.MAQUYEN);
          localStorage.setItem("username", response.data.user.USERNAME || response.data.user.username);

          // Cập nhật giao diện ngay lập tức bằng cách reload trang

          // Điều hướng sau khi đăng nhập thành công
          if (response.data.maquyen === 1) {
            this.router.push('/admin');
          } else {
            this.router.push('/');
      }
    }
      } catch (error) {
        console.error("Lỗi đăng nhập:", error);
        alert(error.response?.data || "Đăng nhập thất bại!");
      }
    },
  },
};
</script>

<style scoped>
.switch-text {
  text-align: center;
  margin-top: 20px;
}
.switch-text a {
  color: #28a745;
  text-decoration: none;
}
.switch-text a:hover {
  text-decoration: underline;
}
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}
h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}
h2 i {
  margin-right: 10px;
}
.input-group {
  margin-bottom: 20px;
}
label {
  display: flex;
  align-items: center;
  font-weight: bold;
  color: #555;
  margin-bottom: 5px;
}
label i {
  margin-right: 10px;
  color: #28a745;
}
input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}
input:focus {
  border-color: #28a745;
  outline: none;
  box-shadow: 0 0 5px rgba(40, 167, 69, 0.5);
}
button {
  width: 100%;
  padding: 12px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}
button i {
  margin-right: 10px;
}
button:hover {
  background-color: #218838;
}
</style>
