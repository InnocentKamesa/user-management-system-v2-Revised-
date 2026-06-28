import express from "express";
import dotenv from "dotenv";
import authRouter from "./src/apps/auth/auth.router.js";
import errorHandler from "./src/middlewares/errorHandler.js";

dotenv.config();

const app = express();

//essential middleware
app.use(express.json());
app.use(express.urlencoded());

//error handling middleware
app.use(errorHandler);


//app routers
app.use("/auth/", authRouter);

export default app;
