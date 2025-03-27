import { createRouter, createWebHistory } from 'vue-router';
import GiaoDien from '../components/GiaoDien.vue';
import BusDetail from '../components/Detail.vue';
import HomePage from '../components/HomePage.vue';
import CarDetail from '@/components/CarDetail.vue';
import LoginForm from '@/components/LoginForm.vue';
import DangKyForm from '@/components/DangKyForm.vue';
import AdminPage from '@/components/AdminPage.vue';
import DatVe from '@/components/DatVe.vue';
import FindTicket from '@/components/FindTicket.vue';
import DoiTacPage from '@/components/DoiTacPage.vue';
import QuanLyQuyen from '@/components/QuanLyQuyen.vue';
import QLNhanVien from '@/components/QLNhanVien.vue';
import QLTaixe from '@/components/QLTaixe.vue';
import LoaiXePage from '@/components/LoaiXePage.vue';
import CapQuyen from '@/components/CapQuyen.vue';
 // Cập nhật đường dẫn

const routes = [
  { path: '/gd', name: 'Home', component: GiaoDien },
  { path: '/detail/:id', name: 'Detail', component: BusDetail, props: true },
  {path:'/',name:'Homepage',component:HomePage},
  {path:'/manageroles',name:'QuanLyQuyen',component:QuanLyQuyen},
  {path:'/manageemployees',name:'QuanLyNv',component:QLNhanVien},
  {path:'/managedrivers',name:'QuanLyTx',component:QLTaixe},
  {path:'/loaixe',name:'QuanLyLx',component:LoaiXePage},
  {path:'/kichhoat',name:'Kichhoat',component:CapQuyen},
  { path: '/cardetail/:id', name: 'CarDetail', component: CarDetail, props: true,meta: { requiresAuth: true } },
  { path: '/login', name: 'LoginForm', component: LoginForm },
  { path: '/regis', name: 'DangKyForm', component: DangKyForm },
  { path: '/admin', name: 'AdminPage', component: AdminPage },
  { path: '/ticket', name: 'FindTicketPage', component: FindTicket },
  { path: '/hoptac', name: 'DoiTacPage', component: DoiTacPage },
  { path: '/datve', name: 'DatVe', component: DatVe, props: true }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  const userRole = parseInt(localStorage.getItem('userRole'), 10);

  if (to.path === '/admin' && userRole !== 1) {
    alert('Bạn không có quyền truy cập vào trang quản trị!');
    next('/'); // Chuyển hướng về trang chính nếu không có quyền admin
  } else {
    next(); // Cho phép truy cập nếu hợp lệ
  }
},
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem("accessToken"); // Hoặc cách kiểm tra trạng thái đăng nhập khác
  
  if (to.path === "/ticket" && !isLoggedIn) {
    alert("Bạn cần đăng nhập để truy cập quản lý vé!");
    next(false); // Chặn điều hướng
  } else {
    next(); // Cho phép điều hướng
  }
},
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("accessToken"); // hoặc sessionStorage
  if (to.meta.requiresAuth && !token) {
      alert("Bạn cần đăng nhập để đặt vé!");
      next("/login"); // Chuyển hướng về trang đăng nhập
  } else {
      next();
  }
}
)
));

export default router;
