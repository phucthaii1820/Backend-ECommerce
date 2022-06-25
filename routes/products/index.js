import express from "express";
import productsController from "../../controllers/products/index.js";

const router = express.Router();

router.get('/getList', productsController.getProducts)

export default router;