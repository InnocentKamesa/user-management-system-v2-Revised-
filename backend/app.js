import express from "express";
import dotenv from "dotenv";
import authRouter from "./src/apps/auth/auth.router.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import cors from "cors";

dotenv.config();

const app = express();

//essential middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

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

export default app;
