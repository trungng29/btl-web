import express from 'express';

const router = express.Router();

// Route lấy trang chủ
router.get('/', (req, res) => {    
    // console.log(req.isLoggedIn); // Kiểm tra trạng thái đăng nhập
    res.render('index.ejs', { isLoggedIn: req.isLoggedIn });
});

export { router };