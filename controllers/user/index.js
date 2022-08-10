import userService from "../../services/user.service.js";

export default {
  async info(req, res) {
    if (req.user_data) {
      const phone = req.user_data.phone;
      const user_data = await userService.findUserByPhone(phone);

      if (user_data) {
        res.send({
          user_data,
        });
      } else {
        res
          .status(400)
          .json({ success: false, message: "User is not already exists" });
      }
    } else
      res
        .status(400)
        .json({ success: false, message: "Please login your account!" });
  },

  async changePassword(req, res) {
    if (req.user_data) {
      const { password, newPassword } = req.body;

      const user_data = await userService.updatePassword(
        req.user_data.phone,
        password,
        newPassword
      );
      if (user_data) {
        res
          .status(200)
          .json({ success: true, message: "Update password success!" });
      } else {
        res
          .status(400)
          .json({ success: false, message: "Old password is not correct !" });
      }
    } else
      res
        .status(400)
        .json({ success: false, message: "Please login your account!" });
  },

  async forgotPassword(req, res) {
    const { phone, newPassword } = req.body;
    const user_data = await userService.forgotPassword(
      phone,
      newPassword
    );
    if (user_data) {
      res
        .status(200)
        .json({ success: true, message: "Update password success!" });
    }
    else
      res.status(400).json({ success: false, mess: "Update password fail!" })
  },

  async addWish(req, res) {
    if (req.user_data) {
      const { product_id } = req.body;
      const wish = await userService.addProductOnWish(
        req.user_data._id,
        product_id
      );
      res.send({
        wish,
      });
    } else
      res
        .status(400)
        .json({ success: false, message: "Please login your account!" });
  },

  async removeWish(req, res) {
    if (req.user_data) {
      const { product_id } = req.body;
      const wish = await userService.removeProductOnWish(
        req.user_data._id,
        product_id
      );
      res.send({
        wish,
      });
    } else
      res
        .status(400)
        .json({ success: false, message: "Please login your account!" });
  },

  async wishList(req, res) {
    if (req.user_data) {
      const wish = await userService.getWishList(req.user_data._id);
      res.send({
        wish,
      });
    } else
      res
        .status(400)
        .json({ success: false, message: "Please login your account!" });
  },

  async updateInfo(req, res) {
    if (req.user_data) {
      const {
        email,
        fullname,
        gender,
        address,
        province,
        district,
        ward,
        cmnd,
      } = req.body;

      const user_data = await userService.updateInfo(
        req.user_data.phone,
        email,
        fullname,
        gender,
        address,
        province,
        district,
        ward,
        cmnd
      );
      res
        .status(200)
        .json({ success: true, message: "Update info success!", user_data });
    } else
      res
        .status(400)
        .json({ success: false, message: "Please login your account!" });
  },

  async addCart(req, res) {
    if (req.user_data) {
      const { product_id, type_id, quantity } = req.body;
      const cart = await userService.addCart(
        req.user_data._id,
        product_id,
        type_id,
        quantity
      );
      res.send({
        cart,
      });
    } else
      res
        .status(400)
        .json({ success: false, message: "Please login your account!" });
  },

  async removeCart(req, res) {
    if (req.user_data) {
      const { cart_id } = req.body;
      const cart = await userService.removeCart(req.user_data._id, cart_id);
      res.send({
        cart,
      });
    } else
      res
        .status(400)
        .json({ success: false, message: "Please login your account!" });
  },

  async checkExitUser(req, res) {
    const phone = req.body.phone;
    const user_data = await userService.checkExitsUser(phone);
    if (user_data) {
      res.send({
        user_data,
      });
    } else res.json({ success: false, message: "User is not already exists" });
  },

  async getAllUsers(req, res) {
    const users = await userService.getAllUsers();
    res.send({
      users,
    });
  },

  async getUserById(req, res) {
    const id = req?.query?.id;
    const user_data = await userService.getUserById(id);
    res.send({
      user_data,
    });
  },

  async deleteUser(req, res) {
    const id = req?.query?.id;
    const user_data = await userService.deleteUser(id);
    res.send({
      message: "Delete user success!",
    });
  },
};
