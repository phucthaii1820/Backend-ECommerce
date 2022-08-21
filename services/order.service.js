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
    return await OrderModel.find({ userId: _id }).populate({
      path: "products.idProduct",
    });
  },
  async getOrderById(id) {
    return await OrderModel.findById(id);
  },

  async changeStatus(id, statusOrder) {
    return await OrderModel.findByIdAndUpdate(
      id,
      { statusOrder },
      { new: true }
    );
  },

  async getOrderById(id) {
    return await OrderModel.findById(id);
  },

  async getAllAdmin() {
    return await OrderModel.find();
  },
};
