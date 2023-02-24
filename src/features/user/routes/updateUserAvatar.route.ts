import { Request, Response } from "express";

import { IUser } from "../../../models/User.model";

import { isValidImageFormat } from "../../../helpers/isValidImageFormat";

import { NotificationService } from "../../../services/NotificationService";
import { UserService } from "../../../services/UserService";


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
    message: "Avatar has been changed and your teammates will see it very soon",
    type: "success",
  });

  return res.json({
    message: "User avatar was changed",
  });
};
