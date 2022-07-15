import express from "express";
import orderService from "../../services/order.service.js";
import orderController from "../../controllers/order/index.js";

const router = express.Router();

router.get("/get-all", orderController.getAll);

router.post("/create", orderController.createOrder);

router.post("/pay", orderController.pay);
export default router;
