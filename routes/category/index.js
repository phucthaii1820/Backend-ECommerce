import express from "express";
import categoryController from "../../controllers/category/index.js";

const router = express.Router();

/**
 * @openapi
 * /category/all-category:
 *   get:
 *     summary: get all category
 *     tags:
 *       - category
 */
router.get("/all-category", categoryController.getAllCategory);

/**
 * @openapi
 * /category/add-category:
 *   post:
 *     summary: add category
 *     tags:
 *       - category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             required:
 *               - name
 */
router.post("/add-category", categoryController.addCategory);

/**
 * @openapi
 * /category/remove-category:
 *   post:
 *     summary: remove category
 *     tags:
 *       - category
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
router.post("/remove-category", categoryController.removeCategory);

/**
 * @openapi
 * /category/update-category:
 *   post:
 *     summary: update category
 *     tags:
 *       - category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *             required:
 *               - id
 *               - name
 */
router.post("/update-category", categoryController.updateCategory);

/**
 * @openapi
 * /category/get-category-by-id?id={id}:
 *   get:
 *     summary: get category by id
 *     tags:
 *       - category
 *     parameters:
 *     - in: path
 *       name: id
 *       type: string
 *       required: true
 */
router.get("/get-category-by-id", categoryController.getCategoryById);

export default router;
