import { Request, Response } from "express";

import { TeammatesService } from "../teammates.service";

export const getAllUserTeammates = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const teammates = await TeammatesService.getAllUserTeammates(userId);

  return res.json(teammates);
};

export default {
  route: getAllUserTeammates,
  method: "get",
  path: "/:userId",
};
