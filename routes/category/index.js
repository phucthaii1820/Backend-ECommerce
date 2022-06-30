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

export default router;
