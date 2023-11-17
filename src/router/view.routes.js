import { Router } from "express";
import { uploader } from "../utils/multer.js";
import ProductManager from "../controllers/ProductManager.js";
import passportCall from "../middleware/passportCall.middleware.js"
import authorization from "../middleware/authorization.middleware.js";
import userModel from "../Daos/Mongo/models/user.model.js";

const product = new ProductManager();

const router = Router();

router.get('/subirArch', (req, res) => {
    res.render('subirArch')
});

router.get('/register', (req, res) => {
    res.render('register')
});

router.get("/", async (req, res) => {

    res.render('home', {
        isLoggedIn: req.session.user ? true : false
        , nameUser: req.session.user ? req.session.user.name : ''
    });
})


router.get("/login", async (req, res) => {

    res.render('login')

})


router.get("/users", [
    passportCall('jwt'),
    authorization(['ADMIN'])
], async (req, res) => {
    try {
        //paginate
        const { numPage = 1, limit = 1, query = '' } = req.query
        let { docs,
            hasNextPage,
            hasPrevPage,
            nextPage,
            prevPage,
            page
        } = await userModel.paginate({}, { limit: limit, page: numPage, lean: true })
        //en el primer param de Paginate, pueden filtrar
        // console.log(users)
        res.status(200).render('users', {
            showNav: true,
            users: docs,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
            page

        })
    } catch (error) {
        console.log(error)

    }


})
//  let allProducts = await product.getProducts()
// res.render("home", {
//     title: "Express Avanzado // Handlebars",
//     products: allProducts
// })


router.post('/subirArch', uploader.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send({ status: 'error', error: 'No se pudo guardar imagen' })
    }

    res.send({ status: 'success', payload: 'archivo subido con exito.' })
});


export default router;
