import express from 'express';
import { articleController } from '../controllers/articleController.js';

const router = express.Router();

router.get("/getarticle", articleController.getArticles);
router.get("/transportArticle/:id", articleController.transportArticle);

export { router }