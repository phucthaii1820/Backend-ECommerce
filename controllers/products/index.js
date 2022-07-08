import productService from "../../services/product.service.js";
import cloudinary from "../../configs/cloudinary.config.js";
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

  async addProduct(req, res, next) {
    if (req.user_data && req.user_data?.role === 1000) {
      const { title, description, nameBrand, type, category } = req.body;
      const product = await productService.createProduct(
        title,
        description,
        nameBrand,
        type,
        category
      );

      const url = [];
      req.files.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, {
          public_id: "products/" + product._id + "/" + item.filename,
        });
        await productService.addImageProduct(product._id, result.secure_url);
      });

      res.status(200).json({ success: true, message: "Add product success" });
    } else
      res
        .status(400)
        .json({ success: false, message: "You are not authorized" });
  },
};
