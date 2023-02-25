import { UserRecord } from "firebase-admin/lib/auth/user-record";

import { User, IUser } from "./user.model";
import { firebaseApp } from "../../utils/firebase";

import { NotificationService } from "../notification/notification.service";
import { logger } from "../../utils/logger";

export class UserService {
  public static async getUser(uid: string) {
    const userDB = await User.findOne({ uid });

    return userDB;
  }

  public static async createUser(uid: string) {
    const userDB = await this.getUser(uid);

    if (!userDB && uid) {
      const user: UserRecord = await firebaseApp.auth().getUser(uid);

      const createdDBUser = new User({
        uid,
        fullname: user.displayName,
      });

      const savedUser = await createdDBUser.save();

      await NotificationService.createNotification({
        userId: uid,
        title: "Congratulations!",
        message: "You recieved the welcome badge",
        type: "badge",
      });

      return savedUser;
    }

    logger.info("User is already created");

    return userDB;
  }

  public static async updateUserProfile(
    userProfile: Partial<IUser> & { uid: string }
  ) {
    const user = await this.getUser(userProfile.uid);

    if (!user) {
      throw new Error("User is not found");
    }

    user.set({
      ...userProfile,
    });

    await user.save();
  }
}
