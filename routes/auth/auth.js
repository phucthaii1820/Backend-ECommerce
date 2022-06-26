import express from "express";
import loginController from "../../controllers/auth/login.js";
import registerController from "../../controllers/auth/register.js";

const router = express.Router();

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login to Bikergear
 *     tags:
 *       - auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - phone
 *               - password
 */
router.post('/login', loginController.login)

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Register to Bikergear
 *     tags:
 *       - auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - phone
 *               - password
 */
router.post('/register', registerController.register)

router.get('/test', (req, res) => {
    console.log(req.user_data)
})

export default router;