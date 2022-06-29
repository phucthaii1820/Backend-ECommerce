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

  async addWish(req, res) {
    if (req.user_data) {
      const { idProduct } = req.body;
      const wish = await userService.addProductOnWish(
        req.user_data._id,
        idProduct
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
      const { idProduct } = req.body;
      const wish = await userService.removeProductOnWish(
        req.user_data._id,
        idProduct
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
};
