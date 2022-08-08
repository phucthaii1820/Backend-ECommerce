import Product from "../models/Product.model.js";
import Store from "../models/Store.model.js";
import { mongoose } from "mongoose";

export default {
  async createProduct(title, description, nameBrand, type, category, image) {
    if (typeof type === "string") {
      type = JSON.parse(type);
    }
    const product = await Product.create({
      title,
      description,
      nameBrand,
      type,
      category,
      image,
    });

    product.type.map(async (item) => {
      await Store.updateOne(
        { _id: item.store_id },
        {
          $push: {
            productStore: {
              type_id: item._id,
              quantity: item.quantity,
              product_id: product._id,
            },
          },
        }
      );
    });

    return product;
  },

  async getAllProducts(page) {
    const products = await Product.find({});
    return products;
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

  async searchProduct(keyword, page, nPerPage = 20) {
    const list = await Product.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { nameBrand: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    })
      .skip(page > 0 ? (page - 1) * nPerPage : 0)
      .limit(nPerPage);
    let totalProducts = await Product.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { nameBrand: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    }).count();
    let totalPages = 0;
    if (totalProducts % nPerPage === 0) totalPages = totalProducts / nPerPage;
    else totalPages = Math.floor(totalProducts / nPerPage + 1);
    return [
      { producs: list },
      { currentPage: page },
      { totalPages: totalPages },
    ];
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
    const product = await Product.findById(_id);
    if (product) {
      product.type.map(async (item) => {
        await Store.updateOne(
          { _id: item.store_id },
          {
            $pull: {
              productStore: { type_id: item._id },
            },
          }
        );
      });
    }
    await Product.deleteOne({ _id });
  },

  async updateProduct(_id, title, description, nameBrand, type, category) {
    if (typeof type === "string") {
      type = JSON.parse(type);
    }
    const product = await Product.findById(_id);
    if (product) {
      product.type.map(async (item) => {
        await Store.updateOne(
          { _id: item.store_id },
          {
            $pull: {
              productStore: { type_id: item._id },
            },
          }
        );
      });
    }

    const image = [];
    await Product.updateOne(
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

    const newProduct = await Product.findById(_id);

    newProduct.type.map(async (item) => {
      await Store.updateOne(
        { _id: item.store_id },
        {
          $push: {
            productStore: { type_id: item._id, quantity: item.quantity },
          },
        }
      );
    });

    return newProduct;
  },

  async createComment(productId, content, userId) {
    const product = await Product.findById(productId);
    if (product) {
      const comments = [...product.comments];
      comments.push({
        userId,
        content,
      });
      await Product.updateOne(
        { _id: productId },
        {
          comments,
        }
      );
    }
    return product;
  },

  async replyComment(productId, commentId, content) {
    const product = await Product.findById(productId);
    if (product) {
      const comments = [...product.comments];
      const comment = comments.find(
        (item) => item._id.toString() === commentId
      );
      if (comment) {
        await Product.updateOne(
          { _id: productId, "comments._id": commentId },
          {
            "comments.$.reply": content,
          }
        );
      }
    }
    return product;
  },
};
