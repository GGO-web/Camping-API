import mongoose from "mongoose";

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_CONNECTION as string, () => {
  console.log("MongoDB successfully connected");
});
