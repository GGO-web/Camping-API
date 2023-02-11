import { Request, Response } from "express";

import { UserRecord } from "firebase-admin/lib/auth/user-record";

import { firebaseApp } from "../utils/firebase";

import { IUser, User } from "../models/User.model";

import { isValidImageFormat } from "../helpers/isValidImageFormat";
import { NotificationService } from "../services/NotificationService";
import { UserService } from "../services/UserService";

export const getAllUsers = async (req: Request, res: Response) => {
  const listUsersResult = await firebaseApp.auth().listUsers();

  return res.json(listUsersResult.users);
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await UserService.createUser(id);

  return res.json(user);
};

export const updateUserProfile = async (req: Request, res: Response) => {
  const { uid, fullname, occupation, bio } = req.body as IUser;

  await UserService.updateUserProfile({ uid, fullname, occupation, bio });

  await NotificationService.createNotification({
    userId: uid,
    title: "User profile",
    message: "Profile successfully updated check it out",
    type: "success",
  });

  return res.json({
    message: "User profile has successfully updated",
  });
};

export const updateUserAvatar = async (req: Request, res: Response) => {
  const { uid, avatar } = req.body as IUser;

  if (!isValidImageFormat(avatar)) {
    return res.status(400).json({
      message: "Avatar format is not allowed or incorrect. Use base64 instead",
    });
  }

  await UserService.updateUserProfile({ uid, avatar });

  await NotificationService.createNotification({
    userId: uid,
    title: "User profile",
    message:
      "Avatar has been changed and your teammates will see it very soon",
    type: "success",
  });

  return res.json({
    message: "User avatar was changed",
  });
};
