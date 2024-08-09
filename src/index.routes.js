import connectDB from "../DB/connection.js";
import { globalEroorHandling } from "../src/utils/errorHandling.js"
import AuthRouter from  "./modules/auth/auth.routes.js"
import UserRouter from "./modules/User/user.routes.js"
import ProductRouter from "./modules/product/product.routes.js"
import CategoryRouter from "./modules/categeory/categeory.routes.js"
import SubcategoryRouter from "./modules/subcategory/sybcategory.routes.js"
import BrandRouter from "./modules/brands/brands.routes.js"
import WhishlistRouter from "./modules/wishlist/whishlist.routes.js"

const initApp = (app, express) => {
  app.use(express.json());
  app.use('/auth', AuthRouter)
  app.use("/user",UserRouter)
  app.use("/product",ProductRouter)
  app.use("/category",CategoryRouter)
  app.use("/subcategory",SubcategoryRouter)
  app.use("/brand",BrandRouter)
  app.use("/wishlist",WhishlistRouter)



  app.use(globalEroorHandling);
  app.use("/*", (req, res, next) => {
    return res.json({ message: "In_valid Routing🚫" })
})
  connectDB();
};

export default initApp;
