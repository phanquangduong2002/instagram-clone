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
    profilePicture: {
      type: String,
      default:
        "https://firebasestorage.googleapis.com/v0/b/instagram-clone-82c10.appspot.com/o/1675712396046avatar.jpg?alt=media&token=79bca2c0-7642-4a3f-96f0-5ca5eb93c89e",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
