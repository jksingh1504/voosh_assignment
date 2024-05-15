const express = require("express");
const cors = require("cors");
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swaggerSpec.json");
const { connectDB } = require("./app/config/connectDB.js");
const { errorHandler } = require("./app/middlewares/errorHandler.js");
const userRoutes = require("./app/routes/user.routes.js");
const { PORT } = process.env;

const app = express();

// swagger ui server setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors(), express.json());

app.get("/", (req, res) => {
  return res.status(200).json("home page.");
});

app.use("/api", userRoutes);

app.use(errorHandler);

app.listen(PORT, async () => {
  await connectDB();
  console.log("server connected at port:", PORT);
});
