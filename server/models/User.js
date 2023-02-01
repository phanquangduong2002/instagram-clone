import mongoose, { Schema } from "mongoose";

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
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    description: { type: String },
    profilePicture: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
