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
router.get('/info', userController.info)

export default router;