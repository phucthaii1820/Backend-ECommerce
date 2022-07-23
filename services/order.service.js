import OrderModel from "../models/Order.model.js";

export default {
  async createOrder(userId, products, ship, total, statusOrder, payment) {
    const order = new OrderModel({
      userId,
      products: products,
      ship: ship,
      total: total,
      statusOrder: statusOrder,
      payment: payment,
    });
    return await order.save();
  },
  async getAll(_id) {
    return await OrderModel.find({ userId: _id });
  },
  async getOrderById(id) {
    return await OrderModel.findById(id);
  },
};
