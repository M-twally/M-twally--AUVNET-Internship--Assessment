import { Router } from "express";
import * as CategoryRouter from "./controller/categoery.js";
import SubcategoryRouter from "../subcategory/sybcategory.routes.js"
import { allowedTo, auth } from "../../middleware/auth.js";
import { fileUpload } from "../../utils/multer.cloud.js";
const router=Router()

//el parent 
router.use('/:categoryId/subcategories',SubcategoryRouter)
router.post("/",auth,/*allowedTo(`admin`),*/fileUpload("image","category").single("image"),CategoryRouter.add_category)
router.get("/",CategoryRouter.getAllCategories)
router.patch("/:id",fileUpload("image","category").single("image"),CategoryRouter.updateCategories)
router.delete("/:id",CategoryRouter.deleteCategories)
router.get("/:id",CategoryRouter.get_categoryBYId)


export default router