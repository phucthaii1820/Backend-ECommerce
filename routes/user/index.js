import express from "express";
import infoController from "../../controllers/user/info.js";

const router = express.Router();

router.get('/info', infoController.info)

export default router;