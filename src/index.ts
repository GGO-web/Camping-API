import express, { Express } from "express";

import morgan from "morgan";

// routers
import { UserRouter } from "./routers/UserRouter";

// middlewares
const { errorHandler } = require("./middleware/errorMiddleware");
const { asyncWrapper } = require("./helpers/asyncWrapper");

// configs
require("dotenv").config();

const app: Express = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));

// using routers
app.use("/api/user", UserRouter);

// listening server startup
(async () => {
  try {
    app.listen(process.env.PORT || 9090, () => {
      console.log(`Server started on port: ${process.env.PORT || 9090}`);
    });
  } catch (err: any) {
    console.error(`Error on server startup: ${err.message}`);
  }
})();

// ERROR HANDLER
app.use(errorHandler);
