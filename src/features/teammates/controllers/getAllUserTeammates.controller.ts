import { Request, Response } from "express";
import { IRouteConfig } from "../../../types/routeConfig.type";

import { TeammatesService } from "../teammates.service";

export const getAllUserTeammates = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const teammates = await TeammatesService.getAllUserTeammates(userId);

  return res.json(teammates);
};

export default {
  route: getAllUserTeammates,
  method: "get",
  path: "/all/:userId",
} as IRouteConfig;
