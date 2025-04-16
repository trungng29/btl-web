import express from 'express';
import { articleController } from '../controllers/articleController.js';

const router = express.Router();

router.get("/getarticle", articleController.getArticles);
router.get("/transportArticle/:id", articleController.transportArticle);
router.get("/searchArticle", articleController.searchArticles);
router.get("/getArticlesOldest/:id", articleController.getArticlesOldest);

export { router }