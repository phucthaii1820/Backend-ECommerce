import mongoose from "mongoose";
import Comment from "../models/Comment.model.js";

export default {
  async getComments(id) {
    return await Comment.find({ product: id });
  },

  async creatComment(product, user, content) {
    return await Comment.create({
      product,
      user,
      content,
    });
  },
};
