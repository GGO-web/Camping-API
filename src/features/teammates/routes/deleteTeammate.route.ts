import { Request, Response } from "express";
import { IRouteConfig } from "../../../types/routeConfig.type";

import { TeammatesService } from "../teammates.service";

export const deleteTeammate = async (
  req: Request<any, any, { userId: string; teammateId: string }, any>,
  res: Response
) => {
  const { userId, teammateId } = req.query;

  await TeammatesService.deleteTeammate(userId, teammateId);

  return res.json({ message: "Teammate deleted successfully" });
};

export default {
  route: deleteTeammate,
  method: "delete",
  path: "/delete",
} as IRouteConfig;
