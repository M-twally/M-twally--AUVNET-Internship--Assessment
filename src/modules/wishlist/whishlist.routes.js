import { Router } from "express";
import * as WhishlistRouter from "./controller/wishlist.js";
import { auth } from "../../middleware/auth.js";
const router=Router()


router.post("/",auth,WhishlistRouter.addToWishlist)
router.patch("/",auth,WhishlistRouter.updateWishlist)
router.delete("/",auth,WhishlistRouter.deleteFromWishlist)




export default router