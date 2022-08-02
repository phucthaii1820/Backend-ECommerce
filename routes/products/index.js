import express from "express";
import productsController from "../../controllers/products/index.js";
import upload from "../../configs/multer.config.js";

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
 * /products/get-all-products:
 *   get:
 *     summary: get all product
 *     tags:
 *       - products
 */
router.get("/get-all-products", productsController.getAllProducts);

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
 *         multipart/form-data:
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
 *                 type: array
 *                 items:
 *                   type: file
 *             required:
 *               - title
 *               - description
 *               - nameBrand
 *               - type
 *               - category
 *               - image
 */
router.post(
  "/add-product",
  upload.array("image"),
  productsController.addProduct
);

/**
 * @openapi
 * /products/update-product:
 *   post:
 *     summary: update product
 *     tags:
 *       - products
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
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
 *                 type: array
 *                 items:
 *                   type: file
 *             required:
 *               - id
 *               - title
 *               - description
 *               - nameBrand
 *               - type
 *               - category
 *               - image
 */
router.post(
  "/update-product",
  upload.array("image"),
  productsController.updateProduct
);

/**
 * @openapi
 * /products/remove-product:
 *   post:
 *     summary: remove product
 *     tags:
 *       - products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *             required:
 *               - id
 */
router.post("/remove-product", productsController.removeProduct);

/**
 * @openapi
 * /products/search?keyword={keyword}&page={page}:
 *   get:
 *     summary: search product
 *     tags:
 *       - products
 *     parameters:
 *     - in: path
 *       name: keyword
 *       type: string
 *       required: true
 *     - in: path
 *       name: page
 *       required: true
 *       type: interger
 */
router.get("/search", productsController.searchProduct);

export default router;
