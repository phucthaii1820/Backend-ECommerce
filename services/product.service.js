import Product from "../models/Product.model.js";
import { mongoose } from "mongoose";

export default {
  async createProduct(title, description, nameBrand, type, category, image) {
    if (typeof type === "string") {
      type = JSON.parse(type);
    }
    return await Product.create({
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

  async addImageProduct(_id, url) {
    const product = await Product.findById(_id);
    let image = [...product.image];
    image.push(url);
    return await Product.updateOne(
      { _id },
      {
        image,
      }
    );
  },

  async removeProduct(_id) {
    await Product.deleteOne({ _id });
  },

  async updateProduct(_id, title, description, nameBrand, type, category) {
    if (typeof type === "string") {
      type = JSON.parse(type);
    }
    const image = [];
    return await Product.updateOne(
      { _id },
      {
        title,
        description,
        nameBrand,
        type,
        category,
        image,
      }
    );
  },
};
