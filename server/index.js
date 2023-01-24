import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import AuthRoutes from "./routes/auth.js";
import UserRoutes from "./routes/user.js";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongodb connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

connect();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", AuthRoutes);
app.use("/api/user", UserRoutes);

app.listen(8000, () => {
  console.log("Listen to port 8000");
});
