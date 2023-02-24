import { getAllFeedbacks } from "./routes/getAllFeedbacks.route";
import { getAllUserFeedbacks } from "./routes/getAllUserFeedbacks.route";
import { createFeedback } from "./routes/createFeedback.route";
import { deleteFeedback } from "./routes/deleteFeedback.route";

export const controller = {
  getAllFeedbacks,
  getAllUserFeedbacks,
  createFeedback,
  deleteFeedback,
};
