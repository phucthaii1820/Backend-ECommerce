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
 * /user/get-all-users:
 *   get:
 *     summary: Get all user
 *     tags:
 *       - user
 */
router.get("/get-all-users", userController.getAllUsers);

/**
 * @openapi
 * /user/get-user-by-id?id={id}:
 *   get:
 *     summary: get user by id
 *     tags:
 *       - user
 *     parameters:
 *     - in: path
 *       name: id
 *       type: string
 *       required: true
 */
router.get("/get-user-by-id", userController.getUserById);

/**
 * @openapi
 * /user/delete-user?id={id}:
 *   get:
 *     summary: delete user
 *     tags:
 *       - user
 *     parameters:
 *     - in: path
 *       name: id
 *       type: string
 *       required: true
 */
router.get("/delete-user", userController.deleteUser);

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
 * /user/forgot-password:
 *   post:
 *     summary: Forgot password for user
 *     tags:
 *       - user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *               newPassword:
 *                 type: string
 *             required:
 *               - phone
 *               - newPassword
 */
router.post("/forgot-password", userController.forgotPassword);

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
 *               product_id:
 *                 type: string
 *             required:
 *               - product_id
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
 *               product_id:
 *                 type: string
 *             required:
 *               - product_id
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

/**
 * @openapi
 * /user/update-info:
 *   post:
 *     summary: Update info user
 *     tags:
 *       - user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               fullname:
 *                 type: string
 *               gender:
 *                 type: string
 *               address:
 *                 type: string
 *               province:
 *                 type: integer
 *               district:
 *                 type: integer
 *               ward:
 *                 type: integer
 *               cmnd:
 *                 type: string
 *             required:
 *               - password
 *               - newPassword
 */
router.post("/update-info", userController.updateInfo);

/**
 * @openapi
 * /user/add-cart:
 *   post:
 *     summary: add cart
 *     tags:
 *       - user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: string
 *               type_id:
 *                 type: string
 *               quantity:
 *                 type: integer
 *             required:
 *               - product_id
 */
router.post("/add-cart", userController.addCart);

/**
 * @openapi
 * /user/remove-cart:
 *   post:
 *     summary: remove cart product
 *     tags:
 *       - user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cart_id:
 *                 type: string
 *             required:
 *               - cart_id
 */
router.post("/remove-cart", userController.removeCart);

/**
 * @openapi
 * /user/check-exist-user:
 *   post:
 *     summary: check exist user
 *     tags:
 *       - user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *             required:
 *               - phone
 */
router.post("/check-exist-user", userController.checkExitUser);

router.get("/clear-cart", userController.clearCart);

export default router;
