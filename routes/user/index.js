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

export default router;
