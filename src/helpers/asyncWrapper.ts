import { Request, Response, NextFunction, Router } from "express";

// middleware to handle async/await errors
export const asyncWrapper =
  (controller: any) => (req: Request, res: Response, next: NextFunction) =>
    controller(req, res, next).catch(next);
