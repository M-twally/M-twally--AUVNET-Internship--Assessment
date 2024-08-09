import { Router } from "express";
import * as SubcategoryRouter from "./controller/subcategory.js"
import { allowedTo, auth } from "../../middleware/auth.js";

const router=Router({mergeParams:true})
router.post("/",auth,allowedTo(`admin`),SubcategoryRouter.add_Subcategory)
router.get("/",SubcategoryRouter.getAllSubCategories)
router.patch("/:id",auth,allowedTo(`admin`),SubcategoryRouter.updateSubCategory)
router.delete("/:id",auth,allowedTo(`admin`),SubcategoryRouter.deleteSubCategory)




export default router