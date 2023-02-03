import User from "../models/User.js";

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("followers", ["-password"])
      .populate("following", ["-password"]);
    const { password, ...othersData } = user._doc;
    res.status(200).json({
      success: true,
      user: othersData,
    });
  } catch (error) {
    console.log(error);
    res.json(500).json({ success: false, message: "Internal server error" });
  }
};
export const findUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.params.username })
      .populate("followers", ["-password"])
      .populate("following", ["-password"]);
    const { password, ...othersData } = user._doc;
    res.status(200).json({
      success: true,
      user: othersData,
    });
  } catch (error) {
    console.log(error);
    res.json(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateUser = async (req, res, next) => {
  if (req.params.id === req.user.userId) {
    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      )
        .populate("followers", ["-password"])
        .populate("following", ["-password"]);
      const { password, ...othersData } = updateUser._doc;
      res.status(200).json({
        success: true,
        message: "User information updated successfully",
        user: othersData,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  } else {
    res.status(403).json({
      success: false,
      message: "You can update only your account",
    });
  }
};

export const followUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.id);

    if (!user.followers.includes(req.body.id)) {
      await user.updateOne({ $push: { followers: req.body.id } });

      await currentUser.updateOne({ $push: { following: req.params.id } });

      res.status(200).json({
        success: true,
        message: "Following the user",
      });
    } else {
      res.status(403).json({
        success: false,
        message: "You really follow the user",
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

export const unfollowUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.id);
    if (user.followers.includes(req.body.id)) {
      await user.updateOne({
        $pull: {
          followers: req.body.id,
        },
      });
      await currentUser.updateOne({
        $pull: {
          following: req.params.id,
        },
      });

      res.status(200).json({
        success: true,
        message: "Unfollowing the user",
      });
    } else {
      res.status(403).json({
        success: false,
        message: "You really unfollow the user",
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
