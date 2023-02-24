import {createNotification} from "./routes/createNotification.route";
import {deleteNotification} from "./routes/deleteNotification.route";
import {getAllNotifications} from "./routes/getAllNotifications.route";

export const controller = {
  getAllNotifications,
  createNotification,
  deleteNotification,
}
