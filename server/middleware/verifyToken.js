import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "You are not authenticated",
    });
  jwt.verify(token, process.env.JWT, (error, user) => {
    if (error)
      return res.status(403).json({
        success: false,
        message: "Token is invalid",
      });
    req.user = user;
    next();
  });
};
