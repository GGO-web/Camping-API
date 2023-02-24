import { Request, Response } from "express";

import { TeammatesService } from "../../../services/TeammatesService";

// Teammates endpoints
export const getAllUserTeammates = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const teammates = await TeammatesService.getAllUserTeammates(userId);

  return res.json(teammates);
};

export const addTeammate = async (req: Request, res: Response) => {
  const { userId, teammateId } = req.body;

  await TeammatesService.addTeammate(userId, teammateId);

  return res.json({ message: "Teammate added successfully" });
};

export const deleteTeammate = async (
  req: Request<any, any, { userId: string; teammateId: string }, any>,
  res: Response
) => {
  const { userId, teammateId } = req.query;

  await TeammatesService.deleteTeammate(userId, teammateId);

  return res.json({ message: "Teammate deleted successfully" });
};
