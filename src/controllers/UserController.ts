import { Request, Response } from "express";

import { UserRecord } from "firebase-admin/lib/auth/user-record";

import { firebaseApp } from "../utils/firebase";

import { IUser, User } from "../models/User.model";

import { isValidImageFormat } from "../helpers/isValidImageFormat";
import { NotificationService } from "../services/NotificationService";

export const getAllUsers = async (req: Request, res: Response) => {
  const listUsersResult = await firebaseApp.auth().listUsers();

  return res.json(listUsersResult.users);
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const userDB = await User.findOne({ uid: id });

  if (!userDB) {
    const user: UserRecord = await firebaseApp.auth().getUser(id);

    const createdDBUser = new User({
      uid: id,
      fullname: user.displayName,
    });

    const savedUser = await createdDBUser.save();

    await NotificationService.createNotification({
      userId: id,
      title: "Congratulations!",
      message: "You recieved the welcome badge",
      type: "badge",
    });

    return res.json(savedUser);
  }

  console.log("User is already created");

  return res.json(userDB);
};

export const updateUserProfile = async (req: Request, res: Response) => {
  const { uid, fullname, occupation, bio } = req.body as IUser;

  await User.findOneAndUpdate(
    { uid },
    {
      fullname,
      occupation,
      bio,
    }
  );

  await NotificationService.createNotification({
    userId: uid,
    title: "User profile",
    message: "Your profile successfully updated check it out",
    type: "success",
  });

  return res.json({
    message: "User profile has successfully updated",
  });
};

export const updateUserAvatar = async (req: Request, res: Response) => {
  const { uid, avatar } = req.body as IUser;

  if (!isValidImageFormat(avatar)) {
    res.status(400).json({
      message: "Avatar format is not allowed or incorrect. Use base64 instead",
    });
  }

  await User.findOneAndUpdate(
    { uid },
    {
      avatar: avatar,
    }
  );

  await NotificationService.createNotification({
    userId: uid,
    title: "User profile",
    message: "Your avatar has been changed your teammates will see it very soon",
    type: "success",
  });

  return res.json({
    message: "User avatar was changed",
  });
};
