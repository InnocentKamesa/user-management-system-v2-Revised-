import express from "express";
import authenticate from "../../middlewares/authentication.js";
import allowedRoles from "../../middlewares/authorization.js";
import {getAll, getUserById, addUser} from "./admin.controllers.js";
import {registrationValidator} from "../auth/auth.validator.js";

const adminRouter = express.Router();

adminRouter.get("/user/all/", authenticate, getAll);
adminRouter.get("/user/:id/", authenticate, allowedRoles("admin"), getUserById);
adminRouter.post("/user/add/", registrationValidator, addUser);


export default adminRouter;