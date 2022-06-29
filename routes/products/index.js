import express from "express";
import productsController from "../../controllers/products/index.js";

const router = express.Router();

router.get("/getListByCategory", productsController.getProductsByCategory);

router.get("/get-product", productsController.getInfoProduct);

router.post("/add-product", productsController.addProduct);

export default router;
