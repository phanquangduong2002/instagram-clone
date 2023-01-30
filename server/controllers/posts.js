import User from "../models/User.js";
import Post from "../models/Post.js";
import { json } from "express";

export const createPost = async (req, res, next) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json({
      success: true,
      message: "Create post is successfully",
      post: savedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    await post.deleteOne();
    res.status(200).json({
      success: true,
      message: "Post deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const likeOrDislike = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.id)) {
      await post.updateOne({
        $push: {
          likes: req.body.id,
        },
      });
      res.status(200).json({
        success: true,
        message: "Post has been liked",
      });
    } else {
      await post.updateOne({
        $pull: {
          likes: req.body.id,
        },
      });

      res.status(200).json({
        success: true,
        message: "Post has been disliked",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server orror",
    });
  }
};

export const getAllPosts = async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.params.id);
    const userPosts = await Post.find({ userId: currentUser._id });
    const followersPosts = await Promise.all(
      currentUser.following.map((followerId) => {
        return Post.find({ userId: followerId });
      })
    );

    res.status(200).json({
      success: true,
      posts: userPosts.concat(...followersPosts),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getUserPosts = async (req, res, next) => {
  try {
    const userPosts = await Post.find({ userId: req.params.id }).sort({
      createAt: -1,
    });
    res.status(200).json({
      success: true,
      posts: userPosts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
    });
  }
};

export const getExplorePosts = async (req, res, next) => {
  try {
    const getExplorePosts = await Post.find({
      likes: { $exists: true },
    }).sort({ likes: -1 });
    res.status(200).json({
      success: true,
      posts: getExplorePosts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const CreateComment = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    await post.updateOne({
      $push: {
        comments: req.body,
      },
    });
    res.status(200).json({
      success: true,
      message: "Comment successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const DeleteComment = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    const [comment] = await Promise.all(
      post.comments.filter((comment) => {
        return comment._id == req.body.commentId;
      })
    );
    if (req.body.userId === comment.userId) {
      await post.updateOne({
        $pull: {
          comments: comment,
        },
      });
      res.status(200).json({
        success: true,
        message: "Comment deleted",
      });
    } else {
      res.status(403).json({
        success: false,
        message: "Only your comments can be deleted",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
