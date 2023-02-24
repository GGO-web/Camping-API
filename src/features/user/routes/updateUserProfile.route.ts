import { Request, Response } from "express";

import { IUser } from "../user.model";

import { UserService } from "../user.service";

import { NotificationService } from "../../notification/notification.service";

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
