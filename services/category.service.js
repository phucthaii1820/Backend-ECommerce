import CategoryModel from "../models/Category.model.js";

export default {
  async createCategory(name) {
    await CategoryModel.create({ name });
    return await CategoryModel.find();
  },
  async getCategory() {
    return await CategoryModel.find();
  },

  async removeCategory(id) {
    await CategoryModel.findByIdAndDelete(id);
    return await CategoryModel.find();
  },

  async updateCategory(id, name) {
    await CategoryModel.findByIdAndUpdate(id, { name });
    return await CategoryModel.find();
  },
};
