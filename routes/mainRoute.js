import express from 'express';
import { categoryController } from '../controllers/categoryController.js';

const router = express.Router();

// Route lấy trang chủ
router.get('/', async (req, res) => {
    try {
        // Lấy categories trực tiếp
        const categories = await categoryController.getCategoriesTitle();

        // Render với categories trực tiếp
        res.render('index.ejs', { 
            isLoggedIn: req.isLoggedIn, 
            username: req.username,
            role: req.role,
            categoryTree: categories // Truyền trực tiếp mảng categories
        });
    } catch (error) {
        console.error('Error loading categories:', error);
        res.render('index.ejs', { 
            isLoggedIn: req.isLoggedIn, 
            username: req.username,
            role: req.role,
            categoryTree: []
        });
    }
});

export { router };