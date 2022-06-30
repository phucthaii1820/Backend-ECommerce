import categoryService from "../../services/category.service.js";

export default {
  async getAllCategory(req, res) {
    const data = await categoryService.getCategory();
    res.send(data);
  },
};
