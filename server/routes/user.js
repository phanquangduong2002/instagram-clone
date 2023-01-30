import express from "express";
import {
  getUser,
  updateUser,
  followUser,
  unfollowUser,
} from "../controllers/user.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Get User
router.get("/find/:id", getUser);

// Update User
router.put("/update/:id", verifyToken, updateUser);

// Follow User
router.put("/follow/:id", verifyToken, followUser);

// Unfollow User
router.put("/unfollow/:id", verifyToken, unfollowUser);

export default router;
