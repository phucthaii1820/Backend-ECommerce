import express from "express";
import productsController from "../../controllers/products/index.js";

const router = express.Router();

/**
 * @openapi
 * /products/get-list-by-category?category={category}&page={page}:
 *   get:
 *     summary: get info product
 *     tags:
 *       - products
 *     parameters:
 *     - in: path
 *       name: category
 *       type: string
 *       required: true
 *     - in: path
 *       name: page
 *       required: true
 *       type: interger
 */
router.get("/get-list-by-category", productsController.getProductsByCategory);

/**
 * @openapi
 * /products/get-product?id={id}:
 *   get:
 *     summary: get info product
 *     tags:
 *       - products
 *     parameters:
 *     - in: path
 *       name: id
 *       type: string
 *       required: true
 */
router.get("/get-product", productsController.getInfoProduct);

/**
 * @openapi
 * /products/add-product:
 *   post:
 *     summary: add product
 *     tags:
 *       - products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               nameBrand:
 *                 type: string
 *               type:
 *                 type: array
 *                 items:
 *                   type: object
 *                 example: [{ "color": "#ffd700", "quantity": 20, "price": 4000000 }, { "color": "#ffd700", "quantity": 20, "price": 4000000 }]
 *               category:
 *                 type: string
 *               image:
 *                 type: string
 *             required:
 *               - title
 *               - description
 *               - nameBrand
 *               - type
 *               - category
 *               - image
 */
router.post("/add-product", productsController.addProduct);

export default router;
