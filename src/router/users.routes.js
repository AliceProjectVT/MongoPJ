import { Router } from "express";
import userManagerMongo from "../Daos/Mongo/userManager.js";



const router = Router()


let userService = new userManagerMongo()


router.get("/", async (req, res) => {
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


router.post("/", async (req, res) => {

    try {
        const newUser = req.body

        let result = await userService.createUser(newUser)
        res.send({
            status: 'success',
            payload: result
        })
    } catch (error) {
        console.log(error)
    }
})



export default router