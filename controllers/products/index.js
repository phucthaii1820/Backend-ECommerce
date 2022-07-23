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

  async removeProduct(req, res) {
    if (req.user_data && req.user_data?.role === 1000) {
      const { id } = req.body;
      const product = await productService.getProduct(id);
      if (product) {
        await productService.removeProduct(id);
        try {
          await cloudinary.api.delete_resources_by_prefix("products/" + id);

          await cloudinary.api.delete_folder("products/" + id);
        } catch (error) {
          console.log(error);
        }
        res
          .status(200)
          .json({ success: true, message: "Remove product success" });
      } else
        res
          .status(400)
          .json({ success: false, message: "Product is not already exists" });
    } else
      res
        .status(400)
        .json({ success: false, message: "You are not authorized" });
  },

  async updateProduct(req, res) {
    if (req.user_data && req.user_data?.role === 1000) {
      const { id, title, description, nameBrand, type, category } = req.body;
      const product = await productService.getProduct(id);
      if (product) {
        await productService.updateProduct(
          id,
          title,
          description,
          nameBrand,
          type,
          category
        );
        try {
          await cloudinary.api.delete_resources_by_prefix("products/" + id);
        } catch (error) {
          console.log(error);
        }
        const url = [];
        req.files.map(async (item) => {
          const result = await cloudinary.uploader.upload(item.path, {
            public_id: "products/" + id + "/" + item.filename,
          });
          await productService.addImageProduct(id, result.secure_url);
        });

        res
          .status(200)
          .json({ success: true, message: "Update product success" });
      } else
        res
          .status(400)
          .json({ success: false, message: "Product is not already exists" });
    } else
      res
        .status(400)
        .json({ success: false, message: "You are not authorized" });
  },

  async searchProduct(req, res) {
    const { keyword, page } = req?.query;
    const listProducts = await productService.searchProduct(keyword, page);
    res.send({
      data: listProducts,
    });
  },
};
