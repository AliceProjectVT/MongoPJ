import { Router } from "express";

const router = Router();


router.get('/setfirmcookies', async (req, res) => {
    console.log(req.cookies)
    res.cookie('galletitas', 'Aquí está el contenido de las galletitas', { maxAge: 1000000, signed: true }).send('Cookie atajada');
});

router.get('/getfirmcookies', async (req, res) => {
    console.log(req.signedCookies);
    res.send(res.signedCookies);

});

router.get('/deletecookie', async (req, res) => {
    console.log(req.cookies);
    res.clearCookie('galletitas').send('borrada las galletas');
});
router.get('/session', (req, res) => {
    if (req.session.counter) {
        req.session.counter++
        res.send(`se ha visitado el sitio ${req.session.counter} veces. `)

    } else {
        req.session.counter = 1;
        res.send('<p>Bienvenido</p>')
    }

})
router.post('/login', (req, res) => {
    const { email, password } = req.body
    if (email != 'd@i.com' || password != '123456') {
        return res.send('login fallido')
    }
    req.session.user = email
    req.session.admin = true
    res.send
    return res.send('Exito al logear')

})

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) res.send({ status: 'logout error', error: err })
        res.send('logout exitoso')
    })
})



export default router;
