<template>
    <div class="register-container">
      <h2><i class="fa fa-bus" aria-hidden="true"></i>Đăng ký</h2>
      <form @submit.prevent="handleRegister">
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
  
        <div class="input-group">
          <label for="confirmPassword">
            <i class="fa fa-lock"></i> Xác nhận mật khẩu:
          </label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" required />
        </div>
  
        <button type="submit">
          <i class="fa fa-user-plus"></i> Đăng ký
        </button>
      </form>
      <p class="switch-text">
        Đã có tài khoản?
        <router-link to="/login">Đăng nhập</router-link>
      </p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const username = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  
  const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    alert('Mật khẩu xác nhận không khớp!');
    return;
  }

  try {
    const response = await axios.post('http://localhost:3000/user/users/create', {
      username: username.value,
      password: password.value,
    });

    if (response.data) {
      alert('Đăng ký thành công! Vui lòng đăng nhập.');
      router.push('/login'); // Chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
    }
  } catch (error) {
    console.error('Lỗi đăng ký:', error);
    alert(error.response?.data || 'Đăng ký thất bại');
  }
};
</script>

  <style scoped>
  .register-container {
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
  </style>