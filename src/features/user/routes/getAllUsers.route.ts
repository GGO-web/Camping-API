import { Request, Response } from "express";

import { firebaseApp } from "../../../utils/firebase";

export const getAllUsers = async (_: Request, res: Response) => {
  const listUsersResult = await firebaseApp.auth().listUsers();

  return res.json(listUsersResult.users);
};

export default {
  route: getAllUsers,
  path: "/all",
  method: "get",
};
