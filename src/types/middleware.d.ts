import { Request, Response, NextFunction } from "express";

export type MiddlewareType = (
  req: Request<any, any, any, any>,
  res: Response<any, any>,
  next: NextFunction
) => any;
