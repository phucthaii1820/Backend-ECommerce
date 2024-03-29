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

  async changeStatus(req, res) {
    if (req.user_data) {
      const { id, statusOrder } = req.body;
      const order = await orderService.changeStatus(id, statusOrder);
      if (order === false)
        res.status(200).json({ success: false, message: "Không đủ số lượng" });
      else res.json({ success: true, message: "Đổi trạng thái thành công" });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Please login your account!" });
    }
  },

  async getById(req, res) {
    if (req.user_data) {
      const { id } = req.query;
      const order = await orderService.getOrderById(id);
      res.json(order);
    } else {
      res
        .status(400)
        .json({ success: false, message: "Please login your account!" });
    }
  },

  async getAllAdmin(req, res) {
    if (req.user_data) {
      const orders = await orderService.getAllAdmin();
      res.json(orders);
    } else {
      res
        .status(400)
        .json({ success: false, message: "Please login your account!" });
    }
  },
};
