import express, { application } from "express";
import cors from "cors";
import { mongoose } from "mongoose";
import dotenv from "dotenv";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
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

app.get("/success", (req, res) => {
  const payerId = { payer_id: req.query.PayerID };
  const paymentId = req.query.paymentId;
  const amount = req.query.amount;

  // const execute_payment_json = {
  //   payer_id: payerId,
  //   transactions: [
  //     {
  //       amount: {
  //         currency: "USD",
  //         total: amount,
  //       },
  //     },
  //   ],
  // };

  paypal.payment.execute(paymentId, payerId, function (error, payment) {
    if (error) {
      res.send({ mess: "cancle" });
    } else {
      res.send({ data: payment });
    }
  });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
