import User from "../models/User.js";

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...othersData } = user._doc;
    res.status(200).json({
      success: true,
      othersData,
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
      );
      const { password, ...othersData } = updateUser._doc;
      res.status(200).json({
        success: true,
        message: "User information updated successfully",
        othersData,
      });
    } catch (error) {
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
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
