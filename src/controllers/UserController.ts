import { Request, Response } from "express";

import { UserRecord } from "firebase-admin/lib/auth/user-record";

import { firebaseApp } from "../utils/firebase";

import { IUser, User } from "../models/User.model";

import { isValidImageFormat } from "../helpers/isValidImageFormat";

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

  return res.json({
    message: "User avatar was changed",
  });
};
