import { AppError } from "../../../models/Error.model";

import { NotificationService } from "../../notification/notification.service";
import { TripService } from "../trip.service";
import { UserService } from "../../user/user.service";

import { IUser } from "../../user/user.model";

export class TeammatesService {
  public static getAllUserTeammates = async (userId: string) => {
    const activatedTrip = await TripService.getActivatedTrip(userId);

    const teammates: IUser[] = [];

    for (let currentTeammate of activatedTrip?.teammates) {
      if (!currentTeammate) {
        continue;
      }

      const teammate = await UserService.getUser(currentTeammate.userId);

      teammates.push(teammate as IUser);
    }

    return teammates;
  };

  public static addTeammate = async (userId: string, teammateId: string) => {
    const activatedTrip = await TripService.getActivatedTrip(userId);
    const teammate = await UserService.getUser(teammateId);

    if (RegExp(userId, "i").test(teammateId)) {
      throw new AppError("You can't add yourself as a teammate", 400);
    }

    if (RegExp(activatedTrip.userId, "i").test(teammateId)) {
      throw new AppError(
        "You are trying to add trip owner, that's a bad idea :)",
        400
      );
    }

    const isPresentAlready = activatedTrip?.teammates.some(
      (teammate) => teammate.userId === teammateId
    );

    if (isPresentAlready) {
      throw new AppError("Teammate is already added", 400);
    }

    if (!teammate) {
      throw new AppError("Teammate is not found", 404);
    }

    activatedTrip?.teammates.push({
      userId: teammateId,
      isOnline: false,
    });

    await activatedTrip?.save();

    const user = await UserService.getUser(userId);

    await NotificationService.createNotification({
      userId: userId,
      title: "Teammate added to trip",
      message: `You added user (${teammate?.fullname}) successfully`,
      type: "success",
    });

    await NotificationService.createNotification({
      userId: teammateId,
      title: `Invitation from ${user?.fullname}`,
      message: `You are invited to the trip (${activatedTrip.tripName})`,
      type: "success",
    });
  };

  public static deleteTeammate = async (userId: string, teammateId: string) => {
    const activatedTrip = await TripService.getActivatedTrip(userId);

    const teammateIsPresent = activatedTrip?.teammates.some(
      (teammate) => teammate.userId === teammateId
    );

    if (!teammateIsPresent) {
      throw new AppError(
        "Teammate is not found or has been already removed",
        404
      );
    }

    activatedTrip?.set({
      teammates: activatedTrip.teammates.filter(
        (teammate) => teammate.userId !== teammateId
      ),
    });

    await activatedTrip?.save();

    const teammate = await UserService.getUser(teammateId);

    await NotificationService.createNotification({
      userId: userId,
      title: "Teammate deleted from trip",
      message: `User (${teammate!.fullname}) has been deleted from your trip`,
      type: "success",
    });

    await NotificationService.createNotification({
      userId: teammateId,
      title: `Deleted from trip`,
      message: `You are deleted from the trip (${activatedTrip.tripName})})`,
      type: "info",
    });
  };
}
