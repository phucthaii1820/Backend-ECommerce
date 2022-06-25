import express from "express";

import authRoute from '../routes/auth/auth.js'
import adminRoute from '../routes/admin/index.js'
import userRoute from '../routes/user/index.js'
import productRouter from '../routes/products/index.js'

const router = express.Router();

router.use('/auth', authRoute);
router.use('/admin', adminRoute);
router.use('/user', userRoute)
router.use('/products', productRouter);

export default router;