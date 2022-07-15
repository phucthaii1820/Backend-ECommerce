import express, { application } from "express";
import cors from "cors";
import { mongoose } from "mongoose";
import dotenv from "dotenv";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import productService from "./services/product.service.js";
import categoryService from "./services/category.service.js";
import userService from "./services/user.service.js";
import paypal from "paypal-rest-sdk";

import activate_route_middleware from "./middlewares/routes.mdw.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connect Success!!!");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bikergear API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "https://fit-summer-2022-ecommerce.herokuapp.com/",
      },
      {
        url: "http://localhost:4000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/**/*.js"],
};

const specs = swaggerJSDoc(options);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", false);

  // Pass to next layer of middleware
  next();
});

const allowlist = [
  "http://localhost:3000",
  "https://fit-summer-2022-ec-ommerce.vercel.app",
];
const corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};
app.use(cors(corsOptionsDelegate));

activate_route_middleware(app);

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
    "AeBB1FJlFKGdtJr42QirGBpNyfmzJA1giAOFLk-LAsb0RgTq_H2hAg2_hx4VA8H30pB40O071Sz575ah",
  client_secret:
    "EDMpuDQJxZW4CMHDLGE3jVQuW6HImZAd9AwSU2wcAAjGKX-9a3bU1icdsZ2k4TLnCpYUMExBj0QxspF6",
});

app.post("/pay", function (req, res) {
  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: "http://localhost:4000/success",
      cancel_url: "http://localhost:3000/cancel",
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: "Red Sox Hat",
              sku: "001",
              price: "1.0",
              currency: "USD",
              quantity: 15,
            },
            {
              name: "Blue Sox Hat",
              sku: "002",
              price: "1.5",
              currency: "USD",
              quantity: 1,
            },
            {
              name: "Blue Sox Hat",
              sku: "003",
              price: "1.5",
              currency: "USD",
              quantity: 1,
            },
            {
              name: "Blue Sox Hat",
              sku: "004",
              price: "1.5",
              currency: "USD",
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: "USD",
          total: "19.5",
        },
        description: "Hat for the best team ever",
      },
    ],
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    console.log(payment);
    if (error) {
      res.render("cancle");
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === "approval_url") {
          res.send({ link: payment.links[i].href });
        }
      }
    }
  });
});

app.get("/success", (req, res) => {
  console.log(req);
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;
  const amount = req.query.amount;

  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: "USD",
          total: amount,
        },
      },
    ],
  };

  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    function (error, payment) {
      if (error) {
        res.send({ mess: "cancle" });
      } else {
        res.send({ data: payment });
      }
    }
  );
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
