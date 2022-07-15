import express from "express";

import authRoute from "../routes/auth/auth.js";
import adminRoute from "../routes/admin/index.js";
import userRoute from "../routes/user/index.js";
import productRouter from "../routes/products/index.js";
import categoryRouter from "../routes/category/index.js";
import orderRoute from "../routes/order/index.js";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/admin", adminRoute);
router.use("/user", userRoute);
router.use("/products", productRouter);
router.use("/category", categoryRouter);
router.use("/order", orderRoute);

export default router;
