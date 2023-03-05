import { Request, Response, NextFunction } from "express";

import { AppError } from "../models/Error.model";

import { MiddlewareType } from "../types/middleware";

// middleware to handle async/await errors
export const asyncWrapper =
  (controller: MiddlewareType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (e) {
      if (e instanceof AppError) {
        return res.status(e.code || 400).json({ message: e.message });
      }

      const error = e as Error;

      return res.status(400).json({ message: error.message });
    }
  };
