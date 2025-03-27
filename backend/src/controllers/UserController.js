const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../utils/connectDB');

class UserController {
    async getAllUsers(req, res) {
        try{
            const users = await User.getAll();
            res.status(200).send(users);
        }
        catch (error) {
            res.status(500).send(error.message);
        }
    } 
    async createUser(req, res) {
        const newUser = req.body;
        try {
            const checkUser = await User.checkUser(newUser.username);
            if (checkUser.length > 0) {
                return res.status(400).json('Username already exists');
            }
            const user = await User.create(newUser);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
    async login(req, res) {
        const { username, password } = req.body;
        try {
            const user = await User.checkUser(username);
            if (user.length === 0) {
                return res.status(400).json('Username is incorrect');
            }
            const comparePassword = await bcrypt.compare(password, user[0].PASSWORD);
            if (!comparePassword) {
                return res.status(400).json('Password is incorrect');
            }
            const maquyen = user[0].MAQUYEN;

            // Tạo token
            const token = jwt.sign(
                { id: user[0].ID, username: user[0].USERNAME,maquyen: maquyen },
                process.env.JWT_SECRET,
                { expiresIn: '1d' }
            );
            

            // Lưu token vào cookie
            res.cookie('accessToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 24 * 60 * 60 * 1000
            });
            

            res.status(200).json({ message: 'Login successfully', token: token,
                maquyen: maquyen, user: user[0] });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async logout(req, res) {
        res.clearCookie('accessToken');
        res.status(200).json({ message: 'Logged out successfully' });
    }
    async updateUser(req, res) {
        const { id } = req.params;
        const { username, password, email } = req.body;

        try {
            // 1️⃣ Lấy thông tin user hiện tại từ database
            const user = await User.getUserById(id);
            if (!user) {
                return res.status(404).json({ error: 'User không tồn tại' });
            }

            // 2️⃣ Kiểm tra nếu có thay đổi username, tránh trùng lặp với user khác
            if (username) {
                const checkUser = await User.checkUser(username);
                if (checkUser.length > 0 && checkUser[0].ID !== parseInt(id)) {
                    return res.status(400).json({ error: 'Username đã tồn tại' });
                }
            }

            // 3️⃣ Xử lý mật khẩu: Nếu không nhập mật khẩu mới thì giữ nguyên mật khẩu cũ
            let newpassword = user.PASSWORD; // Giữ mật khẩu cũ
            if (password) {
                newpassword = await bcrypt.hash(password, 10); // Chỉ băm nếu có mật khẩu mới
            }

            // 4️⃣ Cập nhật user trong database
            const updatedUser = await User.updateUser(id, username, newpassword, email);
            res.status(200).json({ message: 'Cập nhật thành công', updatedUser });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async deleteUser(req, res) {
        const {id} = req.params;
        try {
            const user = await User.deleteUser(id);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
    async kichhoatUser(req, res) {
        const { id, maquyen } = req.body;
    
        try {
            if (!id || !maquyen) {
                return res.status(400).json({ error: 'Thiếu ID hoặc mã quyền' });
            }
    
            // Kiểm tra user có tồn tại không
            const [user] = await pool.query('SELECT * FROM TAIKHOAN WHERE ID = ?', [id]);
            if (user.length === 0) {
                return res.status(404).json({ error: 'User không tồn tại' });
            }
    
            // ✅ Định nghĩa câu lệnh SQL trước khi sử dụng
            const query = 'UPDATE TAIKHOAN SET MAQUYEN = ? WHERE ID = ?';
            const [result] = await pool.query(query, [maquyen, id]);
    
            if (result.affectedRows === 0) {
                return res.status(400).json({ error: 'Không thể cập nhật tài khoản' });
            }
    
            res.status(200).json({ message: 'Kích hoạt tài khoản thành công' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async huykichhoatUser(req, res) {
        const { id, maquyen } = req.body;
    
        try {
            if (!id || !maquyen) {
                return res.status(400).json({ error: 'Thiếu ID hoặc mã quyền' });
            }
    
            // Kiểm tra user có tồn tại không
            const [user] = await pool.query('SELECT * FROM TAIKHOAN WHERE ID = ?', [id]);
            if (user.length === 0) {
                return res.status(404).json({ error: 'User không tồn tại' });
            }
    
            // ✅ Định nghĩa câu lệnh SQL trước khi sử dụng
            const query = 'UPDATE TAIKHOAN SET MAQUYEN = ? WHERE ID = ?';
            const [result] = await pool.query(query, [maquyen, id]);
    
            if (result.affectedRows === 0) {
                return res.status(400).json({ error: 'Không thể cập nhật tài khoản' });
            }
    
            res.status(200).json({ message: 'Kích hoạt tài khoản thành công' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getUserById(req, res) {
        const { id } = req.params;
        try {
            const user = await User.getUserById(id);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json('User không tìm thấy');
            }
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
}
module.exports = new UserController;