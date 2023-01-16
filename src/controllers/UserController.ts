import { Request, Response } from "express";

import { UserRecord } from "firebase-admin/lib/auth/user-record";
import { IUser, User } from "../models/User.model";

import { firebaseApp } from "../utils/firebase";

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
