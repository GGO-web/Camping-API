import { Request, Response } from "express";
import { firebaseApp } from "../utils/firebase";

export const getAllUsers = async (req: Request, res: Response) => {
  const listUsersResult = await firebaseApp.auth().listUsers();

  return res.json(listUsersResult.users);
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await firebaseApp.auth().getUser(id);

  return res.json(user);
};
