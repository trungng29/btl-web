import express from 'express';
import { categoryController } from '../controllers/categoryController.js';
import { executeQuery } from "../config/db.js";

const router = express.Router();

router.get('/firstcategory/:id', async (req, res) => {
    const categoryId = req.params.id;
    const query = `SELECT * FROM [dbo].[Category] WHERE alias_name = @id`;
    const values = [categoryId];    
    const paramNames = ["id"];
    const isStoredProcedure = false;
    try {
        const result = await executeQuery(query, values, paramNames, isStoredProcedure);
        const query1 = `SELECT * FROM [dbo].[Category] WHERE id_parent = @id`;
        const values1 = [result.recordset[0].id_category];    
        const paramNames1 = ["id"];
        const result1 = await executeQuery(query1, values1, paramNames1, false);
        res.render('trangDanhMuc.ejs', { categoryData: result.recordset, subCategoryData: result1.recordset });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: result.recordset.alias_name });
    }
});

router.get('/secondcategory/:id', async (req, res) => {
    const categoryId = req.params.id;
    const query = `SELECT * FROM [dbo].[Category] WHERE alias_name = @id`;
    const values = [categoryId];    
    const paramNames = ["id"];
    const isStoredProcedure = false;
    try {
        const result = await executeQuery(query, values, paramNames, isStoredProcedure);
        res.render('trangDanhMuc2.ejs', { categoryData: result.recordset });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Có lỗi xảy ra, vui lòng thử lại!" });
    }
});

export { router };