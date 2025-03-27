const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const port = 3000 || process.env.PORT;
const app = express();
app.use(cors());
const morgan = require('morgan');
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cookieParser = require('cookie-parser');  

app.set('view engine', 'pug');
app.set('views', './src/views');
app.use(cors({
    origin: 'http://localhost:8080', // Điều chỉnh cho đúng frontend của bạn
    credentials: true // Cho phép gửi cookies qua request
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//CODE HERE

// const pool = require('./src/utils/connectDB');
// async function test (){
//     try {
//         const query = 'SELECT * FROM user ';
//         const [result,fields] = await pool.query({
//             sql: query,
//             rowsAsArray: true
//         });
//         console.log(result);
//     } catch (error) {
//         console.log(error);
//     }
    
// }
// test();
const userRouter = require('./src/routes/userRoute');
const chitietveRouter = require('./src/routes/ChiTietVeRoute');
const chuyenxeRouter = require('./src/routes/ChuyenXeRoute');
const khachhangRouter = require('./src/routes/KhachHangRoute');
const loaixeRouter = require('./src/routes/LoaiXeRoute');
const NhanVienRoute = require('./src/routes/NhanVienRoute');
const quyenRouter = require('./src/routes/QuyenRoute');
const taixeRouter = require('./src/routes/TaiXeRoute');
const tuyenxeRouter = require('./src/routes/TuyenXeRoute');
const veRouter = require('./src/routes/VeRoute');
const xeRouter = require('./src/routes/XeRoute');
const ticketRoutes = require('./src/routes/ticketRoutes');

app.use('/quyen', quyenRouter);
app.use('/user', userRouter);
app.use('/chitietve', chitietveRouter);
app.use('/chuyenxe', chuyenxeRouter);
app.use('/khachhang', khachhangRouter);
app.use('/loaixe', loaixeRouter);
app.use('/nhanvien', NhanVienRoute);
app.use('/taixe', taixeRouter);
app.use('/tuyenxe', tuyenxeRouter);
app.use('/ve', veRouter);
app.use('/xe', xeRouter);
app.use('/ticket', ticketRoutes);



app.get('/', (req, res) => {
    res.render('index',); //{user: {name: 'admin', email: 'hello'}});
});


// Middleware xử lý lỗi 404: Khi không có route nào khớp
app.use((req, res, next) => {
    console.log('404 middleware hit');
    res.status(404).render('error404');
  });

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});