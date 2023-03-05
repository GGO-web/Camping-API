import { Request, Response } from "express";
import { asyncWrapper } from "../../../helpers/asyncWrapper";

import { withController } from "../../../helpers/withController";

import { TeammatesService } from "../teammates.service";

export const deleteTeammate = async (
  req: Request<any, any, { userId: string; teammateId: string }, any>,
  res: Response
) => {
  const { userId, teammateId } = req.query;

  await TeammatesService.deleteTeammate(userId, teammateId);

  return res.json({ message: "Teammate deleted successfully" });
};

export default [
  withController("/delete", "delete", asyncWrapper(deleteTeammate))
];
