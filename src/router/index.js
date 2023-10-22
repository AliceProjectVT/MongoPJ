import { Router } from "express";
import ProductRouter from "../router/product.routes.js";
import CartRouter from "../router/carts.routes.js"
import userManagerMongo from "../Daos/Mongo/userManager.js";
import usersRouter from "../router/users.routes.js"
import viewsRouter from "./view.routes.js";

const router = Router()
let userService = new userManagerMongo()

router.use("/views", viewsRouter)
router.use("/products", ProductRouter)
router.use("/cart", CartRouter)
router.use('/api/users', usersRouter)



export default router