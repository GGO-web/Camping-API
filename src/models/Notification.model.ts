import { model, Schema } from "mongoose";

export type TNotificationTypes = "badge" | "info" | "success" | "invitation";
export enum ENotificationTypes {
  badge = "badge",
  info = "info",
  success = "success",
  invitation = "invitation",
}

export interface INotification {
  userId: string;
  id?: string;
  title: string;
  message: string;
  type: TNotificationTypes;
  datetime?: Date | string;
}

const notificationSchema = new Schema<INotification>({
  userId: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: Object.values(ENotificationTypes),
    required: true,
  },
  datetime: {
    type: Date,
    default: new Date().toISOString(),
  },
});

export const Notification = model<INotification>(
  "Notifications",
  notificationSchema
);
