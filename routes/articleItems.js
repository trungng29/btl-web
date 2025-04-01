import express from 'express';
import { getArticles } from "../controllers/All_ItemController.js";
import { getCategories } from '../controllers/All_ItemController.js';
import { getUsers } from '../controllers/All_ItemController.js';
const router = express.Router();

router.get("/articles", getArticles);
router.get("/categories", getCategories)
router.get("/users", getUsers)
export { router }