import { Router } from "express";
import * as AdminRouter from "./controller/admin.js";
import { allowedTo, auth } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import * as AdminValidation from "./admin.validation.js"

const router = Router();

router.post( "/signup",validation(AdminValidation.signUp),AdminRouter.signUp);
router.post("/signIn",validation(AdminValidation.signIn),AdminRouter.signIn);
router.delete("/",auth,validation(AdminValidation.deleteUser),allowedTo(`admin`),AdminRouter.deleteUser);

export default router;
