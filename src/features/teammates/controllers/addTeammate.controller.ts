import { Request, Response } from "express";
import { IRouteConfig } from "../../../types/routeConfig.type";

import { TeammatesService } from "../teammates.service";

export const addTeammate = async (req: Request, res: Response) => {
  const { userId, teammateId } = req.body;

  await TeammatesService.addTeammate(userId, teammateId);

  return res.json({ message: "Teammate added successfully" });
};

export default {
  route: addTeammate,
  method: "post",
  path: "/add"
} as IRouteConfig;
