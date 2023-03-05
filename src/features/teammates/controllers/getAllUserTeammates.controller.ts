import { Request, Response } from "express";
import { asyncWrapper } from "../../../helpers/asyncWrapper";

import { withController } from "../../../helpers/withController";

import { TeammatesService } from "../teammates.service";

export const getAllUserTeammates = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const teammates = await TeammatesService.getAllUserTeammates(userId);

  return res.json(teammates);
};

export default [
  withController("/all/:userId", "get", asyncWrapper(getAllUserTeammates))
];
