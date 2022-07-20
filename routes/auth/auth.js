import express from "express";
import loginController from "../../controllers/auth/login.js";
import registerController from "../../controllers/auth/register.js";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const router = express.Router();

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login to Bikergear
 *     tags:
 *       - auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - phone
 *               - password
 */
router.post("/login", loginController.login);

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Register to Bikergear
 *     tags:
 *       - auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - phone
 *               - password
 */
router.post("/register", registerController.register);

router.post("/generate-code", (req, res) => {
  const { email } = req.body;
  console.log(email);
  const msg = {
    to: email, // Change to your recipient
    from: "bikerbike.ecommerce@gmail.com", // Change to your verified sender
    subject: "Welcome to BikerBike! Confirm Your Email",
    // text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
});

export default router;
