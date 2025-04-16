import express from 'express';
import { categoryController } from '../controllers/categoryController.js';
import { articleController } from '../controllers/articleController.js';
import { executeQuery } from "../config/db.js";
import { getUsers } from '../controllers/All_ItemController.js';
import dayjs from 'dayjs';
import 'dayjs/locale/vi.js'; // Import tiếng Việt

const router = express.Router();

router.get("/getAllCategory", categoryController.getCategoriesTitle1)

router.get("/getArticles", articleController.getArticles1)

router.get("/getUsers", getUsers)



export { router };