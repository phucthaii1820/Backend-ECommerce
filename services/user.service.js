import User from "../models/User.model.js";
import Product from "../models/Product.model.js";
import argon2 from "argon2";

export default {
  //kiểm tra user tồn tại
  async checkExitsUser(phone) {
    const user = await User.exists({ phone });
    return user;
  },

  async deleteUser(id) {
    const user = await User.findByIdAndDelete(id);
    return user;
  },
  async getUserById(id) {
    const user = await User.findById(id);
    return user;
  },
  async getAllUsers() {
    const users = await User.find();
    return users;
  },

  //tạo mới user
  async createNewUser(phone, password) {
    if (!(await User.exists({ phone }))) {
      const hashPass = await argon2.hash(password);
      const user = await User.create({ phone, password: hashPass });
      return user;
    }
    return null;
  },

  //kiểm tra đăng nhập
  async authenticate(phone, password) {
    const user = await User.findOne(
      { phone },
      "name phone password avatar role banned"
    ).exec();
    if (user) {
      if (await argon2.verify(user.password, password)) {
        return await User.findOne({ phone }, "-password").exec();
      }
    }
    return null;
  },

  //Tìm user
  async findUserByID(_id) {
    const user_data = await User.findById(_id, "-password").lean().exec();
    if (user_data) return user_data;
    return null;
  },

  //Tìm user bằng số điện thoại
  async findUserByPhone(phone) {
    const user_data = await User.findOne({ phone }, "-password").exec();
    if (user_data) return user_data;
    return null;
  },

  //Lấy tất cả user
  async getAllUser() {
    return await User.find("-password").exec();
  },

  //cập nhật lại thông tin người dùng
  async updateInfo(
    phone,
    email,
    fullname,
    gender,
    address,
    province,
    district,
    ward,
    cmnd
  ) {
    await User.updateOne(
      { phone },
      {
        email,
        fullname,
        gender,
        address,
        province,
        district,
        ward,
        cmnd,
      }
    );
    return User.findOne({ phone }, "-password").exec();
  },

  //Cập nhật lại password
  async updatePassword(phone, password, newPassword) {
    const user = await User.findOne({ phone });
    if (await argon2.verify(user.password, password)) {
      return User.updateOne(
        { phone },
        {
          password: await argon2.hash(newPassword),
        }
      );
    } else {
      return false;
    }
  },

  //Thêm product vào wish list
  async addProductOnWish(_id, product_id) {
    const user = await User.findById(_id, "wish");
    const wish = user.wish;
    wish.push({ product_id });
    await User.updateOne({ _id }, { wish });

    await Product.updateOne({ _id: product_id }, { $inc: { totalWish: 1 } });
    return wish;
  },

  //Xóa product trong wish list
  async removeProductOnWish(_id, product_id) {
    const user = await User.findById(_id, "wish");
    const wish = user.wish;
    const wishTemp = [];
    for (let i = 0; i < wish.length; i++) {
      if (wish[i].product_id != product_id) {
        wishTemp.push(wish[i]);
      }
    }
    await User.updateOne({ _id }, { wish: wishTemp });
    await Product.updateOne({ _id: product_id }, { $inc: { totalWish: -1 } });
    return wishTemp;
  },

  async getWishList(_id) {
    // const user = await User.findById(_id, "wish");
    const user = await User.aggregate([
      { $match: { _id } },
      { $unwind: "$wish" },
      {
        $lookup: {
          from: "products",
          localField: "wish.product_id",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      { $replaceRoot: { newRoot: "$product" } },
    ]);

    return user;
  },

  async addCart(_id, product_id, type_id, quantity) {
    const user = await User.findById(_id, "cart");
    let cart = user.cart;
    let checkExits = false;
    let totalQuantity = 0;

    const product = await Product.findById(product_id);
    product?.type?.map((item) => {
      if (item._id == type_id) {
        totalQuantity = item.quantity;
      }
    });

    cart.map((item) => {
      if (item.product_id == product_id && item.type_id == type_id) {
        item.quantity + quantity > totalQuantity
          ? (item.quantity = totalQuantity)
          : (item.quantity = item.quantity + quantity);

        if (item.quantity <= 0) {
          const cartTemp = [];
          cart.map((itemChild) => {
            if (itemChild._id != item._id) {
              cartTemp.push(itemChild);
            }
          });

          cart = cartTemp;
        }

        checkExits = true;
      }
    });
    if (!checkExits) {
      if (quantity > 0) cart.push({ product_id, type_id, quantity });
    }

    await User.updateOne({ _id }, { cart });
    return cart;
  },

  async removeCart(_id, cart_id) {
    const user = await User.findById(_id, "cart");
    const cart = user.cart;
    const cartTemp = [];
    cart.map((item) => {
      if (item._id != cart_id) {
        cartTemp.push(item);
      }
    });
    await User.updateOne({ _id }, { cart: cartTemp });
    return cartTemp;
  },

  async forgotPassword(phone, newPassword) {
    const hashPass = await argon2.hash(newPassword);
    return User.updateOne(
      {
        phone: phone,
      },
      { password: hashPass }
    );
  },

  async clearCart(_id) {
    return await User.updateOne({ _id }, { cart: [] });
  },
};
