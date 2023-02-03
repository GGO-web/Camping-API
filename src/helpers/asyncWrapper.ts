import { Request, Response, NextFunction, Router } from "express";

// middleware to handle async/await errors
export const asyncWrapper =
  (controller: Function) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (e) {
      const err = e as Error;
      return res.status(400).json({ message: err.message });
    }
  };
