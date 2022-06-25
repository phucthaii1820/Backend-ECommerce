import express from "express";
import userController from "../../controllers/user/index.js";

const router = express.Router();

router.get('/info', userController.info)

export default router;