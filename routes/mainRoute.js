import express from 'express';

const router = express.Router();

// Route lấy trang chủ
router.get('/', (req, res) => {    
    res.render('index.ejs', { 
        isLoggedIn: req.isLoggedIn, 
        username: req.username,
        role: req.role,
    });
});

export { router };