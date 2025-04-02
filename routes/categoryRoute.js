import express from 'express';
import { categoryController } from '../controllers/categoryController.js';

const router = express.Router();

router.get('/firstcategory', (req, res) => {
    res.render('trangDanhMuc.ejs')
});

router.get('/secondcategory', (req, res) => {
    res.render('trangDanhMuc2.ejs')
});

export { router };