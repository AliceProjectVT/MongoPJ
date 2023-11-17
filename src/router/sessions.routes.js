import { Router } from "express";
import userModel from "../Daos/Mongo/models/user.model.js";
import userManagerMongo from "../Daos/Mongo/userManager.js";
import { createHash, isCorrectPassword } from "../utils/hash.js"
import passport from "passport";
import { generateToken, authToken } from "../utils/jsonwebtoken.js"
import Swal from "sweetalert2";


let userService = new userManagerMongo()

const router = Router()






router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(401).send({ status: 'error', error: 'Usuario o Contraseña incorrecto' });
    }

    if (!isCorrectPassword(user.password, password)) {
        return res.status(401).send({ status: 'error', error: 'Password incorrecto' });
    }

    const token = generateToken({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role
    });

    res.cookie('auth_token', token, {
        maxAge: 30000,
        httpOnly: true
    });

    req.session.user = {
        name: `${user.first_name}`,
        email: user.email
    };

    res.status(200).send({
        status: 'success',
        token: token,
        message: "Bienvenido",
    });
});




router.get('/logout', (req, res, next) => {
    req.session.destroy(err => {
        if (err) res.send({ status: 'logout error', error: err })

        res.send('sesion cerrada.')

    })
})




router.post("/register", async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body

        const exist = await userModel.findOne({ email })
        if (exist) return res.status(401).send({ status: 'error', error: 'El correo se encuentra en uso.' })
        const newUser = {
            first_name,
            last_name,
            email,
            password: createHash(password)
        }
        let result = await userService.createUser(newUser)
        res.redirect('/login')
        console.log("se ha añadido un nuevo usuario");


    } catch (error) {

        console.log(error);
    }
});


//sessions gihub

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => {

})
router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), async (req, res) => {
    req.session.user = req.user
    res.redirect('/')
})

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send(req.user)
})
export default router