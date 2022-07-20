import categoryService from "../../services/category.service.js";

export default {
  async getAllCategory(req, res) {
    const data = await categoryService.getCategory();
    res.send(data);
  },

  async addCategory(req, res) {
    if (req?.user_data?.role === 1000) {
      const { name } = req.body;
      const data = await categoryService.createCategory(name);
      res.send(data);
    } else {
      res
        .status(400)
        .json({ success: false, message: "you are not qualified" });
    }
  },

  async removeCategory(req, res) {
    if (req?.user_data?.role === 1000) {
      const { id } = req.body;
      const data = await categoryService.removeCategory(id);
      res.send(data);
    } else {
      res
        .status(400)
        .json({ success: false, message: "you are not qualified" });
    }
  },

  async updateCategory(req, res) {
    if (req?.user_data?.role === 1000) {
      const { id, name } = req.body;
      const data = await categoryService.updateCategory(id, name);
      res.send(data);
    } else {
      res
        .status(400)
        .json({ success: false, message: "you are not qualified" });
    }
  },

  async getCategoryById(req, res) {
    const { id } = req?.query;
    const data = await categoryService.getCategoryById(id);
    res.send(data);
  },
};
