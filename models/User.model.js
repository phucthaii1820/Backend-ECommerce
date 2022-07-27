import { mongoose } from "mongoose";
import role from "../configs/role.js";

const userSchema = new mongoose.Schema({
  phone: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    default: "",
  },
  fullname: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  province: {
    type: Number,
    default: -1,
  },
  district: {
    type: Number,
    default: -1,
  },
  ward: {
    type: Number,
    default: -1,
  },
  cmnd: {
    type: String,
    default: "",
  },
  dob: Date,
  role: {
    type: Number,
    enum: Object.values(role),
    default: role.buyer,
  },
  bio: {
    type: String,
    default: "Chào mừng đến trang cá nhân trên Đồ Chơi Xe của tôi!",
  },
  receipt: [
    {
      order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    },
  ],
  wish: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    },
  ],
  cart: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      type_id: {
        type: mongoose.Schema.Types.ObjectId,
      },
      quantity: {
        type: Number,
      },
      price: {
        type: Number,
      },
    },
  ],
  dob: {
    type: Date,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", userSchema);
