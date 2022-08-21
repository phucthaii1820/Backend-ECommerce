import { mongoose } from "mongoose";
import statusOrder from "../configs/statusOrder.js";
import typePayment from "../configs/typePayment.js";

const productAtBuySchema = new mongoose.Schema({
  idProduct: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  priceAtBuy: {
    type: Number,
  },
  typeId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  quantity: {
    type: Number,
  },
  total: {
    type: Number,
  },
});

const oderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  products: [productAtBuySchema],
  ship: {
    type: Number,
  },
  total: {
    type: Number,
  },
  statusOrder: {
    type: Number,
    enum: Object.values(statusOrder),
  },
  payment: {
    type: Number,
    enum: Object.values(typePayment),
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Oder", oderSchema);
