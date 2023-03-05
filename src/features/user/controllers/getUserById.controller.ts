import { Request, Response } from "express";
import { asyncWrapper } from "../../../helpers/asyncWrapper";

import { withController } from "../../../helpers/withController";

import { UserService } from "../user.service";

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await UserService.createUser(id);

  return res.json(user);
};

export default [withController("/:id", "get", asyncWrapper(getUserById))];
