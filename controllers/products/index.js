import productService from "../../services/product.service.js";
export default {
  async getProductsByCategory(req, res) {
    const { category, page } = req?.query;
    if (category) {
      const listProducts = await productService.getListProductByCategory(
        category,
        page
      );
      res.send({
        data: listProducts,
      });
    } else
      res
        .status(400)
        .json({ success: false, message: "Category is not already exists" });
  },

  async getInfoProduct(req, res) {
    const { id } = req?.query;
    if (id) {
      const data = await productService.getProduct(id);
      res.send({
        data,
      });
    } else
      res
        .status(400)
        .json({ success: false, message: "Product is not already exists" });
  },

  async addProduct(req, res) {
    if (req.user_data && req.user_data?.role === 1000) {
      const { title, description, nameBrand, type, category, image } = req.body;
      await productService.createProduct(
        title,
        description,
        nameBrand,
        type,
        category,
        image
      );

      res.status(200).json({ success: true, message: "Add product success" });
    } else
      res
        .status(400)
        .json({ success: false, message: "You are not authorized" });
  },
};
