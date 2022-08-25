import Product from "../models/Product.model.js";
import User from "../models/User.model.js";
import Store from "../models/Store.model.js";
import { mongoose } from "mongoose";

export default {
  async createProduct(
    title,
    description,
    nameBrand,
    type,
    category,
    image,
    statusPost
  ) {
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
      statusPost,
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

  async getAllProducts() {
    const products = await Product.find({}).populate({
      path: "comments.userId",
    });

    return products;
  },

  async getListProductByCategory(category, pageNumber = 1, nPerPage = 20) {
    const list = await Product.find({
      category: new mongoose.Types.ObjectId(category),
      statusPost: 1,
    })
      .skip(pageNumber > 0 ? (pageNumber - 1) * nPerPage : 0)
      .limit(nPerPage);

    let totalProducts = await Product.find({
      category: new mongoose.Types.ObjectId(category),
      statusPost: 1,
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
    const product = await Product.findById(_id).populate({
      path: "comments.userId",
    });
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
    return await Product.updateOne({ _id }, { image: url });
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

  async updateProduct(
    _id,
    title,
    description,
    nameBrand,
    type,
    category,
    statusPost
  ) {
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
        statusPost,
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

  async changeQuantity(productId, typeId, quantity) {
    let product = await Product.findById(productId);
    let check = true;
    if (product) {
      for (let item of product.type) {
        if (item._id.toString() === typeId.toString()) {
          if (item.quantity < quantity) {
            check = false;
          } else {
            item.quantity -= quantity;
          }
        }
      }
      console.log(product);

      if (check) {
        const test = await Product.findByIdAndUpdate(
          productId,
          { type: product.type },
          { new: true }
        );
      }

      return check;
    }
  },
};
