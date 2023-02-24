import { model, Schema } from "mongoose";

import { defaultAvatarBASE64 } from "../../constants";

export interface IUser {
  uid: string;
  fullname: string;
  avatar?: string;
  occupation?: string;
  bio?: string;
}

const userSchema = new Schema<IUser>({
  uid: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: defaultAvatarBASE64,
  },
  occupation: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    default: "",
  },
});

export const User = model("users", userSchema);
