import express from "express";
import authenticate from "../../middlewares/authentication.js";
import allowedRoles from "../../middlewares/authorization.js";
import {getAll} from "./admin.controllers.js";

const adminRouter = express.Router();

adminRouter.get("/user/all", authenticate, allowedRoles("admin"), getAll);

export default adminRouter;