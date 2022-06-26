import express from "express";
import cors from "cors";
import { mongoose } from "mongoose";
import dotenv from "dotenv"
import swaggerJSDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import productService from "./services/product.service.js";
import categoryService from "./services/category.service.js";
import userService from "./services/user.service.js";


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
  
app.use(express.json())

const options = {
  definition: {
      openapi: "3.0.0",
      info: {
          title: "Bikergear API",
          version: "1.0.0",
      },
      servers: [{
          url: "https://fit-summer-2022-ecommerce.herokuapp.com/"
      }, {
          url: "http://localhost:4000",
      }],
      components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            }
        }
      },
      security: [{
          bearerAuth: []
      }]
  },
  apis: ["./routes/**/*.js"],
};

const specs = swaggerJSDoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));


activate_route_middleware(app);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
