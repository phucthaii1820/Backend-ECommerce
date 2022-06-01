import express from "express";

import userRoute from './user.js'
import productRoute from './product.js'
import sellerRoute from './seller.js'

const router = express.Router();

router.use('/user', userRoute);
router.use('/product', productRoute);
router.use('/seller', sellerRoute)

export default router;



