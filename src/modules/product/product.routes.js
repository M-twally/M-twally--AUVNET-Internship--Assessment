import { Router } from "express";
import * as ProductRouter from "./controller/product.js";
import { fileUpload,filevalidation } from "../../utils/multer.cloud.js";
import { allowedTo, auth } from "../../middleware/auth.js";
const router=Router()

router.post("/",auth,fileUpload(filevalidation.image).single("image"),ProductRouter.add_product)
router.get("/",auth,ProductRouter.getAllproducts)
router.patch("/:id",auth,ProductRouter.updateProducts)
router.delete("/:id",auth,ProductRouter.deleteproducts)
router.get("/:id",ProductRouter.get_productBYId)


export default router