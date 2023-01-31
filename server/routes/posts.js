import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  createPost,
  deletePost,
  likeOrDislike,
  getAllPosts,
  getUserPosts,
  getExplorePosts,
  CreateComment,
  DeleteComment,
} from "../controllers/posts.js";

const router = express.Router();

// Create post
router.post("/", verifyToken, createPost);

// Delete post
router.put("/:id", verifyToken, deletePost);

// Like or dislike post
router.put("/:id/like", verifyToken, likeOrDislike);

// Get all timeline posts
router.get("/timeline/:id", verifyToken, getAllPosts);

// Get user posts only
router.get("/user/:id", verifyToken, getUserPosts);

// Explore
router.get("/explore", getExplorePosts);

// Create Comment
router.post("/comment/:id", verifyToken, CreateComment);

// Delete comment

router.put("/comment/:id/delete", verifyToken, DeleteComment);

export default router;
