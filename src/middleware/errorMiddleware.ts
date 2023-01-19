// Description: Error handling middleware

import { Response } from "express";

// eslint-disable-next-line no-unused-vars
function errorHandler(err: any, req: any, res: Response, next: any) {
  console.log(err);

  if (
    err.name === "MongoServerError" ||
    err.name === "ValidationError" ||
    err.name === "TypeError" ||
    err.name === "Error" ||
    err.name === "AppError"
  ) {
    return res.status(err?.code || 400).send({ message: err.message });
  }

  return res.status(500).send({ message: "Server error" });
}

module.exports = {
  errorHandler,
};
