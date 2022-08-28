import express from "express";
import storeController from "../../controllers/store/index.js";

const router = express.Router();

router.post("/add", storeController.addStore);

router.get("/get-all", storeController.getAllStores);

router.post("/remove", storeController.removeStore);

router.post("/update", storeController.updateStore);

export default router;
