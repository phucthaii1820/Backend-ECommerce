import express from "express";
import commentController from "../../controllers/comment/index.js";

const router = express.Router();

router.get("/", commentController.getComments);

export default router;
