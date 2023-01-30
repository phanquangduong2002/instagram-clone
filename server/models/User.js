import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      requied: true,
    },
    username: {
      type: String,
      requied: true,
      unique: true,
    },
    password: {
      type: String,
      requied: true,
    },
    followers: { type: Array, default: [] },
    following: { type: Array, default: [] },
    description: { type: String },
    profilePicture: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
