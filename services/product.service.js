import Product from "../models/Product.model.js";
import { mongoose } from "mongoose";

export default {
  async createProduct(title, description, nameBrand, type, category, image) {
    await Product.create({
      title,
      description,
      nameBrand,
      type,
      category,
      image,
    });
  },
  async getListProductByCategory(category, pageNumber, nPerPage = 20) {
    const list = await Product.find({
      category: new mongoose.Types.ObjectId(category),
    })
      .skip(pageNumber > 0 ? (pageNumber - 1) * nPerPage : 0)
      .limit(nPerPage);
    return list;
  },

  //lấy thông tin sản phẩm
  async getProduct(_id) {
    const product = await Product.findById(_id);
    return product;
  },
};
