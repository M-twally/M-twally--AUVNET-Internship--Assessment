import { Router } from "express";
import * as AdminRouter from "./controller/admin.js";
import { allowedTo, auth } from "../../middleware/auth.js";

const router = Router();

router.post( "/signup",AdminRouter.signUp);
router.post("/signIn",AdminRouter.signIn);
router.delete("/",auth,allowedTo(`admin`),AdminRouter.deleteUser);

export default router;
