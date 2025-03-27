<template>
    <div class="admin-container">
        <h1>Quản Lý</h1>
        <div class="header">
            <router-link to="/manageroles">🔑Quản lý quyền</router-link>
            <router-link to="/manageemployees">👨‍💼Quản lý nhân viên</router-link>
            <router-link to="/managedrivers">🚖Quản lý tài xế</router-link>
            <router-link to="/loaixe">🚌Quản lý loại xe</router-link>
            <router-link to="/kichhoat">🔒Cấp quyền người dùng</router-link>
            <span class="welcome-text">Xin chào, {{ username }}</span>
            <button @click="logout" class="logout-button">
                Đăng xuất
                <img src="@/assets/logout.png" alt="Logout Icon" class="icon" />
            </button>

        </div>
        <div class="slider-container">
    <div class="slider">
      <img :src="images[currentIndex]" class="slider-image" />
    </div>
    <button @click="prevSlide" class="prev-btn">❮</button>
    <button @click="nextSlide" class="next-btn">❯</button>
  </div>
    </div>
</template>

<script>
export default {
    name: 'AdminPage',
    data() {
        return {
            username: localStorage.getItem("username") || "",
            images: [
        "https://thanhcongbus.vn/wp-content/uploads/2024/10/BANNER-FILE-AI-web-1-1024x482.jpg",
        "https://xekhachthangthanh.com/uploads/images/banner-trang-chu-360047551.jpg",
        "https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/post/images/198/img_card.png?v=19"
      ],
      currentIndex: 0
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
    isLoggedIn() {
      return this.username !== "";
    }
  },
    methods: {
        nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },
    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    },
        logout() {
            // Xử lý đăng xuất, có thể gọi API hoặc xóa token
            localStorage.removeItem('accessToken');
      localStorage.removeItem('username');
      localStorage.removeItem("userRole");
      this.isLoggedIn = false;
      this.username = ""; 
      this.userrole ="";
      this.$router.push('/login');
        },
        checkLoginStatus() {
      const token = localStorage.getItem('accessToken');
      const storedUsername = localStorage.getItem('username');
      const storedRole = localStorage.getItem('userRole');

      if (token && storedUsername) {
        this.isLoggedIn = true;
        this.username = storedUsername;
        this.userrole = storedRole;
      }
    },
    },
    mounted() {
        const storedUser = localStorage.getItem('username');
        if (storedUser) {
            this.username = storedUser;
            this.isLoggedIn = true;
        }
    }
};

</script>

<style scoped>
.admin-container {
    text-align: center;
    margin-top: 20px;
}
.slider-container {
  position: relative;
  width: 800px;
  height: 400px;
  margin: 20px auto;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

.slider {
  width: 100%;
  height: 100%;
}

.slider-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.5s ease-in-out;
}

.prev-btn, .next-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 24px;
  border-radius: 50%;
}

.prev-btn { left: 10px; }
.next-btn { right: 10px; }

.prev-btn:hover, .next-btn:hover {
  background: rgba(0, 0, 0, 0.8);
}

.admin-container {
    text-align: center;
    margin-top: 20px;
    font-family: Arial, sans-serif;
}

.admin-container {
    text-align: center;
    margin-top: 20px;
    font-family: Arial, sans-serif;
}

/* Header Navigation */
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 30px;
    background-color: #007bff; /* Màu xanh chủ đạo */
    border-radius: 8px;
    margin: 20px auto;
    max-width: 800px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

/* Navigation Links */
.header a {
    text-decoration: none;
    color: rgb(0, 0, 0);
    font-size: 16px;
    font-weight: bold;
    padding: 8px 15px;
    border-radius: 5px;
    transition: 0.3s;
}

.header a:hover {
    background-color: #0056b3; /* Màu xanh đậm khi hover */
}

/* Active Link */
.router-link-active {
    background-color: #0056b3;
    padding: 8px 15px;
}

/* Welcome Text */
.welcome-text {
    font-size: 18px;
    font-weight: bold;
    color: rgb(0, 0, 0);
}

/* Logout Button */
.logout-button {
    background-color: white;
    color: #007bff;
    border: 2px solid #007bff;
    padding: 8px 15px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: 0.3s;
    font-size: 14px;
    font-weight: bold;
}

.logout-button:hover {
    background-color: #007bff;
    color: white;
}

/* Logout Icon */
.icon {
    width: 18px;
    height: 18px;
    margin-left: 8px;
}


.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
    margin: 20px auto;
    max-width: 500px;
}

.welcome-text {
    font-size: 18px;
    font-weight: bold;
}

.logout-button {
    background-color: white;
    color: blue;
    border: none;
    padding: 8px 12px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    cursor: pointer;
}

.logout-button:hover {
    background-color: #e0e0e0;
}

.icon {
    width: 20px;
    height: 20px;
    margin-left: 8px;
}
</style>
