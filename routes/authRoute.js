import express from 'express';
import { authController } from '../controllers/authController.js'; // Import controller cho xác thực

const router = express.Router();

let isLoggedIn = false; // Biến để theo dõi trạng thái đăng nhập

router.post('/login', authController.login); // Đăng nhập

router.post('/register', authController.register); // Đăng ký tài khoản

export { router };