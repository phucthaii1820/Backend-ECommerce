import express from "express";
import orderService from "../../services/order.service.js";
import orderController from "../../controllers/order/index.js";

const router = express.Router();

/**
 * @openapi
 * /order/get-all:
 *   get:
 *     summary: Get all orders of user
 *     tags:
 *       - order
 */
router.get("/get-all", orderController.getAll);

router.post("/create", orderController.createOrder);

router.post("/pay", orderController.pay);

/**
 * @openapi
 * /order/change-status:
 *   post:
 *     summary: change status of order
 *     tags:
 *       - order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               statusOrder:
 *                 type: number
 *             required:
 *               - id
 *               - statusOrder
 */
router.post("/change-status", orderController.changeStatus);

/**
 * @openapi
 * /order/get-by-id?id={id}:
 *   get:
 *     summary: get order by id
 *     tags:
 *       - order
 *     parameters:
 *     - in: path
 *       name: id
 *       type: string
 *       required: true
 */
router.get("/get-by-id", orderController.getById);

/**
 * @openapi
 * /order/get-all-admin:
 *   get:
 *     summary: Get all orders
 *     tags:
 *       - order
 */
router.get("/get-all-admin", orderController.getAllAdmin);

export default router;
