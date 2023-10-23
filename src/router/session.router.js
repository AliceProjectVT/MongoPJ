import { Router } from "express";
import userModel from "../Daos/Mongo/models/user.model.js";
import userManagerMongo from "../Daos/Mongo/userManager.js";

let userService = new userManagerMongo()

const router = Router()



router.post('/login', async (req, res) => {

    
    const { email, password } = req.body
    const user = await userModel.findOne({ email, password })
    console.log('user')
    if (!user) return res.status(401).send({ status: 'error', error: 'Usuario o Contraseña incorrecto' })
    req.session.user = {
        name: `${user.first_name}`,
        email: user.email
    }
    res.redirect('/init/profile')

})



router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) res.send({ status: 'logout error', error: err })
        res.send('Haz cerrado sesion ')
    })
})



router.post("/register", async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body

        const exist = await userModel.findOne({ email })
        if (exist) return res.status(401).send({ status: 'error', error: 'El correo se encuentra en uso.' })
        const newUser = { first_name, last_name, email, password }
        let result = await userService.createUser(newUser)
        res.redirect('/login')
        console.log("se ha añadido un nuevo usuario");


    } catch (error) {

        console.log(error);
    }
});


export default router