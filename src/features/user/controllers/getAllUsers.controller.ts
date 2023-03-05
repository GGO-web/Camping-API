import { Request, Response } from "express";
import { asyncWrapper } from "../../../helpers/asyncWrapper";

import { withController } from "../../../helpers/withController";

import { firebaseApp } from "../../../utils/firebase";

export const getAllUsers = async (_: Request, res: Response) => {
  const listUsersResult = await firebaseApp.auth().listUsers();

  return res.json(listUsersResult.users);
};

export default [
  withController("/all", "get", asyncWrapper(getAllUsers), [
    // add middlewares here
    (req: Request<unknown, unknown, unknown, { key?: string }>, res, next) => {
      const { key } = req.query;

      if (key === process.env.FIREBASE_ACCESS_KEY) {
        next();
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    }
  ])
];
