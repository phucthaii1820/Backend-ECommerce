import { mongoose } from "mongoose";
import statusPost from "../configs/statusPost.js";

const typeProduct = new mongoose.Schema({
  color: {
    type: String,
    require: true,
  },
  store_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store",
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
});

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    statusPost: {
      type: Number,
      enum: Object.values(statusPost),
      default: statusPost.publised,
    },
    nameBrand: {
      type: String,
      require: true,
    },
    totalWish: {
      type: Number,
      default: 0,
    },
    type: [typeProduct],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      require: true,
    },
    image: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);
