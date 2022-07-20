import userService from "../../services/user.service.js";
import jwt from "jsonwebtoken";

export default {
  async register(req, res) {
    if (!(await userService.checkExitsUser(req.body.phone))) {
      const user_data = await userService.createNewUser(
        req.body.phone,
        req.body.password,
        req.body.email
      );

      if (user_data) {
        res.send({
          user_data,
          token: jwt.sign({ user_data }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "2 days",
          }),
        });
      }
    } else {
      res.status(400).json({ success: false, message: "User already exists" });
    }
  },
};
