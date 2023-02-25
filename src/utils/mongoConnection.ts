import mongoose from "mongoose";

import { logger } from "./logger";

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_CONNECTION as string, () => {
  logger.info("MongoDB successfully connected");
});
