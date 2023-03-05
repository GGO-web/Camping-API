import express, { Express } from "express";

import cors from "cors";

import { morganMiddleware } from "./middleware/morganMiddleware";

// middlewares
import { errorHandler } from "./middleware/errorMiddleware";

import { logger } from "./utils/logger";

// configs
import "./utils/config";
import { registerRouters } from "./helpers/registerRouters";

const app: Express = express();

// middlewares
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(morganMiddleware);
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../openapi.json");

// swagger api documentation route: http://localhost:8080/api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// register all features routers
registerRouters(app);

// listening server startup
(async () => {
  try {
    const port = process.env.PORT || 9090;
    app.listen(port, () => {
      logger.info({ message: `Listening on port ${port}`, port });
    });
  } catch (err) {
    const error = err as Error;
    logger.error(`Error on server startup: ${error.message}`);
  }
})();

// ERROR HANDLER
app.use(errorHandler);
