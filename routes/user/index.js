import express from "express";
import userController from "../../controllers/user/index.js";

const router = express.Router();

/**
 * @openapi
 * /user/info:
 *   get:
 *     summary: Get heaeder min profile
 *     tags:
 *       - user
 */
router.get("/info", userController.info);

/**
 * @openapi
 * /user/change-password:
 *   post:
 *     summary: Change password for user
 *     tags:
 *       - user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *               newPassword:
 *                 type: string
 *             required:
 *               - password
 *               - newPassword
 */
router.post("/change-password", userController.changePassword);

/**
 * @openapi
 * /user/add-wish-product:
 *   post:
 *     summary: add wish product
 *     tags:
 *       - user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idProduct:
 *                 type: string
 *             required:
 *               - idProduct
 */
router.post("/add-wish-product", userController.addWish);

/**
 * @openapi
 * /user/remove-wish-product:
 *   post:
 *     summary: remove wish product
 *     tags:
 *       - user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idProduct:
 *                 type: string
 *             required:
 *               - idProduct
 */
router.post("/remove-wish-product", userController.removeWish);

/**
 * @openapi
 * /user/wish-list:
 *   get:
 *     summary: get all wish list
 *     tags:
 *       - user
 */
router.get("/wish-list", userController.wishList);

export default router;
