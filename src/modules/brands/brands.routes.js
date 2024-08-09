import { Router } from "express";
import * as BrandRouter from "./controller/brands.js";
import { allowedTo, auth } from "../../middleware/auth.js";
const router=Router()
router.post("/",auth,allowedTo(`admin`),BrandRouter.add_Brand)
router.get("/",BrandRouter.getAllBrands)
router.patch("/:id",auth,allowedTo(`admin`),BrandRouter.updateBrand)
router.delete("/:id",auth,allowedTo(`admin`),BrandRouter.deleteBrand)




export default router