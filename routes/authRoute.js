import express from 'express';
import { authController } from '../controllers/authController.js'; // Import controller cho xác thực

const router = express.Router();

router.post('/login', authController.login); // Đăng nhập

router.post('/register', authController.register); // Đăng ký tài khoản

export { router };