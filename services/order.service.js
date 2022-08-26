import OrderModel from "../models/Order.model.js";
import ProductService from "./product.service.js";

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
    return await OrderModel.find({ userId: _id })
      .populate({
        path: "products.idProduct",
      })
      .sort({ createAt: -1 });
  },
  async getOrderById(id) {
    return await OrderModel.findById(id);
  },

  async changeStatus(id, statusOrder) {
    let check = true;
    const order = await OrderModel.findById(id);
    if (statusOrder === 2) {
      for (let product of order?.products) {
        const productCheck = await ProductService.getProduct(product.idProduct);

        for (let itemtype of productCheck?.type) {
          if (itemtype._id.toString() === product.typeId.toString()) {
            if (itemtype.quantity < product.quantity) {
              check = false;
            }
          }
        }
      }

      if (check) {
        for (let product of order?.products) {
          const result = await ProductService.changeQuantity(
            product.idProduct,
            product.typeId,
            product.quantity
          );
          check = result;
        }
      }
    }

    if (check) {
      await OrderModel.updateOne(
        { _id: id },
        {
          statusOrder,
        }
      );
    }
    return check;
  },

  async getOrderById(id) {
    return await OrderModel.findById(id);
  },

  async getAllAdmin() {
    return await OrderModel.find().populate({ path: "userId" });
  },
};
