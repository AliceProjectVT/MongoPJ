import { Router } from "express";
import userManagerMongo from "../Daos/Mongo/userManager.js";
import auth from "../middleware/authentications.js";



const router = Router()


let userService = new userManagerMongo()


router.get("/", auth, async (req, res) => {
    try {
        let users = await userService.getUsers()
        res.send({
            status: 'success',
            payload: users
        })
    } catch (error) {
        console.log(error)
    }
})




export default router
