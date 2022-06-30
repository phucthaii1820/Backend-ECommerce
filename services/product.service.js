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

  async getListProductByCategory(category, pageNumber = 1, nPerPage = 20) {
    const list = await Product.find({
      category: new mongoose.Types.ObjectId(category),
    })
      .skip(pageNumber > 0 ? (pageNumber - 1) * nPerPage : 0)
      .limit(nPerPage);

    let totalProducts = await Product.find({
      category: new mongoose.Types.ObjectId(category),
    }).count();
    let totalPages = 0;
    if (totalProducts % nPerPage === 0) totalPages = totalProducts / nPerPage;
    else totalPages = Math.floor(totalProducts / nPerPage + 1);
    // list.push({ currentPage: pageNumber });
    // list.push({ totalPages: totalPages });

    return [
      { producs: list },
      { currentPage: pageNumber },
      { totalPages: totalPages },
    ];
  },

  //lấy thông tin sản phẩm
  async getProduct(_id) {
    const product = await Product.findById(_id);
    return product;
  },
};
