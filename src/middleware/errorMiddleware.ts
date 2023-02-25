// Description: Error handling middleware

import { Request, Response, NextFunction } from "express";

import { logger } from "../utils/logger";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  if (
    err.name === "MongoServerError" ||
    err.name === "ValidationError" ||
    err.name === "TypeError" ||
    err.name === "Error" ||
    err.name === "AppError"
  ) {
    logger.error(err.message);

    return res.status(err?.code || 400).send({ message: err.message });
  }

  logger.error("Server error");

  return res.status(500).send({ message: "Server error" });
}
