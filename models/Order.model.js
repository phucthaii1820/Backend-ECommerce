import { mongoose } from "mongoose";

const productAtBuySchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  PriceAtBuy: {
    type: Number,
  },
});

const oderSchema = new mongoose.Schema({
  product: [productAtBuySchema],
  total: {
    type: Number,
  },
});

export default mongoose.model("Oder", oderSchema);
