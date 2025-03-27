import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import vSelect from 'vue-select'; // Thêm dòng này
import 'vue-select/dist/vue-select.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'vue-toastification/dist/index.css';


const app = createApp(App);
app.component('v-select', vSelect); // Đăng ký component trước khi mount
app.use(router);
app.mount('#app');
