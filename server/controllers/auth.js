import User from "../models/User.js";
import jwt from "jsonwebtoken";
import argon2 from "argon2";

export const signup = async (req, res, next) => {
  const { fullname, username, password } = req.body;

  if (!fullname || !username || !password)
    return res.status(400).json({
      success: false,
      message: "Missing fullname and/or username and/or password",
    });

  try {
    const user = await User.findOne({ username });

    if (user)
      return res
        .status(400)
        .json({ success: false, message: "Username already taken" });

    const hashedPassword = await argon2.hash(req.body.password);
    const newUser = new User({ fullname, username, password: hashedPassword });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT);

    const { password, ...othersData } = newUser._doc;

    res
      .cookie("accesss_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 8 * 3600000),
      })
      .status(200)
      .json({
        success: true,
        message: "User create successfully",
        user: othersData,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const signin = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({
      success: false,
      message: "Missing username and/or password",
    });
  try {
    const user = await User.findOne({ username })
      .populate("followers", ["-password"])
      .populate("following", ["-password"]);
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect username or password" });

    const isCorrect = await argon2.verify(user.password, req.body.password);

    if (!isCorrect)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect username or password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT);

    const { password, ...othersData } = user._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 8 * 3600000),
      })
      .json({
        success: true,
        message: "User logged in successfully",
        user: othersData,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
