import { v4 } from "uuid";

import { NotificationService } from "../../notification/notification.service";
import { ITrip } from "../trip.model";
import { TripService } from "../trip.service";


import { IActivity } from "../../../models/Activity.model";
import { AppError } from "../../../models/Error.model";

export class ActivityService {
  public static getActivityItem = async (
    userId: string,
    trip: ITrip,
    activityId: string
  ) => {
    const currentActivity = trip?.activities.find(
      (activity) => activity.id === activityId
    );

    if (!currentActivity) {
      throw new AppError(
        `Activity item with id ${
          activityId || "undefined"
        } is not found in activated trip`,
        404
      );
    }

    if (currentActivity.userId !== userId && trip.userId !== userId) {
      throw new AppError("The user can only access their own activities", 400);
    }

    return currentActivity;
  };

  public static addActivity = async (userId: string, activity: IActivity) => {
    const activatedTrip = await TripService.getActivatedTrip(userId);

    activatedTrip?.activities.push({ ...activity, userId, id: v4() });

    await activatedTrip?.save();

    await NotificationService.createNotification({
      userId,
      title: "New activity",
      message: `Activity (${activity.heading}) has been added successfully`,
      type: "success",
    });
  };

  public static setActivityCompleted = async (
    userId: string,
    activityId: string
  ) => {
    const trip = await TripService.getActivatedTrip(userId);

    // check if activity with ID is present in trip
    const activity = await this.getActivityItem(userId, trip, activityId);

    if (activity.completed) {
      throw new AppError("Activity has been already completed", 400);
    }

    trip.set({
      activities: trip.activities.map((activity) =>
        activity.id === activityId
          ? {
              ...activity,
              completed: true,
            }
          : activity
      ),
    });

    await trip.save();

    await NotificationService.createNotification({
      userId,
      title: "Completed activity",
      message: `Activity (${activity.heading}) completed successfully`,
      type: "success",
    });

    return activity;
  };

  public static deleteActivity = async (userId: string, activityId: string) => {
    const trip = await TripService.getActivatedTrip(userId);

    // check if activity with ID is present in trip
    const activity = await this.getActivityItem(userId, trip, activityId);

    trip.set({
      activities: trip.activities.filter(
        (activity) => activity.id !== activityId
      ),
    });

    await trip.save();

    await NotificationService.createNotification({
      userId,
      title: "Deleted activity",
      message: `Activity (${activity.heading}) has been deleted successfully`,
      type: "success",
    });

    return activity;
  };
}
