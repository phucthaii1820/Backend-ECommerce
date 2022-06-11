import express from "express";

import authRoute from '../routes/auth/auth.js'
import adminRoute from '../routes/admin/index.js'
import userRoute from '../routes/user/index.js'

const router = express.Router();

router.use('/auth', authRoute);
router.use('/admin', adminRoute);
router.use('/user', userRoute)

export default router;