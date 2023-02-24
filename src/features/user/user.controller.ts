import { getAllUsers } from "./routes/getAllUsers.route";
import { getUserById } from "./routes/getUserById.route";
import { updateUserProfile } from "./routes/updateUserProfile.route";
import { updateUserAvatar } from "./routes/updateUserAvatar.route";

export const controller = {
  getAllUsers,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
};
