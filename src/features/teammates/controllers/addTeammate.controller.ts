import { Request, Response } from "express";
import { asyncWrapper } from "../../../helpers/asyncWrapper";

import { withController } from "../../../helpers/withController";

import { TeammatesService } from "../teammates.service";

export const addTeammate = async (req: Request, res: Response) => {
  const { userId, teammateId } = req.body;

  await TeammatesService.addTeammate(userId, teammateId);

  return res.json({ message: "Teammate added successfully" });
};

export default [withController("/add", "post", asyncWrapper(addTeammate))];
