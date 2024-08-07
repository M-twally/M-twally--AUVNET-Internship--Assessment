import { Router } from "express";
import * as userController from "./controller/user.js";
import  { auth } from "../../middleware/auth.js";
const router = Router();

router.post("/SendEmailOTP",auth,userController.sendEmailOTP)
router.post("/confirmEmail",auth,userController.confirmEmail)

export default router

