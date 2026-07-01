import express from "express";
import {register, login} from "./auth.controller.js";
import {registrationValidator, loginValidator} from "./auth.validator.js";

const authRouter = express.Router();

//auth endpoints
authRouter.post("/register/", registrationValidator, register);
authRouter.post("/login/", loginValidator, login);
//authRouter.post("/verify/");
//authRouter.post("logout");
//authRouter.post("token/refresh/");

export default authRouter;

