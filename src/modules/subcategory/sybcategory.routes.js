import { Router } from "express";
import * as SubcategoryRouter from "./controller/subcategory.js"
const router=Router({mergeParams:true})
router.post("/",SubcategoryRouter.add_Subcategory)
router.get("/",SubcategoryRouter.getAllSubCategories)
router.patch("/:id",SubcategoryRouter.updateSubCategory)
router.delete("/:id",SubcategoryRouter.deleteSubCategory)




export default router