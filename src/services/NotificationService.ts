import { ObjectId } from "mongoose";

import { v4 } from "uuid";
import { AppError } from "../models/Error.model";

import { INotification, Notification } from "../models/Notification.model";

export class NotificationService {
  private static getNotificationById = (id: string) => {
    const notification = Notification.findOne({id: id});

    if (!notification) {
      throw new AppError("Notification has not been found");
    }

    return notification;
  }

  public static getAllNotifications = async (userId: string) => {
    const notifications = await Notification.find({ userId}, "-__v");

    return notifications;
  };

  public static createNotification = async (notification: INotification) => {
    const createdNotification = await Notification.create({
      ...notification,
      id: v4(),
    });

    return createdNotification;
  }

  public static deleteNotification = async (id: string) => {
    const notification = await this.getNotificationById(id);

    await notification?.delete();
  }
}

