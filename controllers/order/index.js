import orderService from "../../services/order.service.js";
import momo from "./momo.js";
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
      const { id } = req.body;
      const order = await orderService.getOrderById(id);
      console.log(order?.payment);
      switch (order?.payment) {
        case 1: {
          const link = await paypal.pay(order);
          res.send({ link });
          break;
        }
        case 2: {
          const result = await momo.pay(order);
          const link = JSON.parse(result).payUrl;
          res.send({ link });
          break;
        }
      }
    } else {
      res
        .status(400)
        .json({ success: false, message: "Please login your account!" });
    }
  },
};
