import { Request, Response } from "express";
import { IRouteConfig } from "../../../types/routeConfig.type";

import { firebaseApp } from "../../../utils/firebase";

export const getAllUsers = async (_: Request, res: Response) => {
  const listUsersResult = await firebaseApp.auth().listUsers();

  return res.json(listUsersResult.users);
};

export default {
  route: getAllUsers,
  middlewares: [
    // add middlewares here
    (req: Request<unknown, unknown, unknown, { key: string }>, res, next) => {
      const { key } = req.query;

      if (key === process.env.FIREBASE_ACCESS_KEY) {
        next();
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    },
  ],
  path: "/all",
  method: "get",
} as IRouteConfig;
