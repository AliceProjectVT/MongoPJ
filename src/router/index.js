import { Router } from "express";
import ProductRouter from "../router/product.routes.js";
import CartRouter from "../router/carts.routes.js"
import userManagerMongo from "../Daos/Mongo/userManager.js";
import usersRouter from "../router/users.routes.js"
import viewsRouter from "./view.routes.js";
import cookiesRouter from "./prueba.routes.js"
import cookieParser from "cookie-parser";
import session from "express-session";
import chatRouter from "./chat.routes.js"
import MongoStore from "connect-mongo";
import sessionRouter from "./session.router.js"
import userProfile from "./profile.routes.js"
const router = Router()
let userService = new userManagerMongo()

router.use(cookieParser('F1RM4S3GUR4'))
router.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://islamartinezd:estoesunaclavesegura@nubecita.m8fbcsp.mongodb.net/?retryWrites=true&w=majority',
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        ttl: 5,
    }),
    secret: 'p4l4br4s3cr3t4',
    resave: true,
    saveUninitialized: true

}))


router.use("/", viewsRouter)
router.use("/api/products", ProductRouter)
router.use("/cart", CartRouter)
router.use('/api/users', usersRouter)
router.use('/home', usersRouter)
router.use('/', cookiesRouter)
router.use('/chat', chatRouter)
router.use('/session', sessionRouter)
router.use('/init', userProfile)



export default router