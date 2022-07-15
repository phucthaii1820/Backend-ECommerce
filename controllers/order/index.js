import orderService from "../../services/order.service.js";
import paypal from "./paypal.js";

export default {
  async getAll(req, res) {
    if (req.user_data) {
      const orders = await orderService.getAll(req.user_data._id);
      res.json(orders);
    } else {
      res
        .status(400)
        .json({ success: false, message: "Please login your account!" });
    }
  },
  async createOrder(req, res) {
    if (req.user_data) {
      const { products, ship, total, statusOrder, payment } = req.body;
      const order = await orderService.createOrder(
        req.user_data._id,
        products,
        ship,
        total,
        statusOrder,
        payment
      );
      res.json(order);
    } else {
      res
        .status(400)
        .json({ success: false, message: "Please login your account!" });
    }
  },

  async pay(req, res) {
    if (req.user_data) {
      const { products } = req.body;
      const link = await paypal.pay(products);
      res.json(link);
    } else {
      res
        .status(400)
        .json({ success: false, message: "Please login your account!" });
    }
  },
};
