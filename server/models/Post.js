import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      requied: true,
    },
    description: {
      type: String,
    },
    photos: {
      type: Array,
      defaultValue: [],
    },
    likes: {
      type: Array,
      defaultValue: [],
    },
    comments: [
      {
        body: String,
        userId: String,
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Post", PostSchema);
