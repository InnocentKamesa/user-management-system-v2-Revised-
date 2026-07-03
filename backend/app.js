import express from "express";
import dotenv from "dotenv";
import authRouter from "./src/apps/auth/auth.router.js";
import adminRouter from "./src/apps/admin/admin.router.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

//essential middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

//error handling middleware
app.use(errorHandler);

//cors
const corsOptions = {
    origin:["http://127.0.0.1:3000", "http://localhost:3000"],
    credentials:true
}
app.use(cors(corsOptions))

//app routers
app.use("/auth/", authRouter);
app.use("/admin/", adminRouter);

export default app;
