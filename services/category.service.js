import CategoryModel from "../models/Category.model.js";

export default {
    async createCategory(name) {
        await CategoryModel.create({name});
    },
}