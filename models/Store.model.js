import { mongoose } from "mongoose";

const productStore = new mongoose.Schema({
  type_id: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
  },
});

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
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
  productStore: [productStore],
});

export default mongoose.model("Store", storeSchema);
