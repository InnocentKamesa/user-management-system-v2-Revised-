import express from "express";
import {createProfile} from "./user.controllers.js";
import { userProfileValidator } from "./user.validator.js";
import authenticate from "../../middlewares/authentication.js";
//import {allowedRoles} from "../../middlewares/authorization.js";

//router
const userRouter = express.Router()

//endpoints
userRouter.post("/profile/create/", authenticate, userProfileValidator, createProfile);


export default userRouter;