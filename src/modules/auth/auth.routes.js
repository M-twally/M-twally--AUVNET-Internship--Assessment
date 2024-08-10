import { Router } from "express";
import * as AuthRouter from "./controller/auth.js";
import * as AuthValidation from "./auth.validations.js";
import { validation } from "../../middleware/validation.js"
const router = Router();

router.post( "/signup",validation(AuthValidation.signUp),AuthRouter.signUp);
router.post("/signIn",validation(AuthValidation.signIn),AuthRouter.signIn);

export default router;
