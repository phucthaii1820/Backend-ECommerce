import userService from "../../services/user.service.js";
import jwt from "jsonwebtoken";

export default {
  async login(req, res) {
    let user_data;
    if (!req.body.phone || !req.body.password)
      res
        .status(400)
        .json({ success: false, message: "Don't have phone or password!" });
    else {
      user_data = await userService.authenticate(
        req.body.phone,
        req.body.password
      );
      if (user_data) {
        res.send({
          user_data,
          token: jwt.sign({ user_data }, process.env.ACCESS_TOKEN_SECRET, {}),
        });
      } else
        res
          .status(400)
          .json({ success: false, message: "Wrong phone or password!" });
    }
  },
};
