import { Router } from "express";
import { uploader } from "../utils/multer.js";
import ProductManager from "../controllers/ProductManager.js";

const product = new ProductManager();

const router = Router();

router.get('/subirArch', (req, res) => {
    res.render('subirArch')
});

router.get('/register', (req, res) => {
    res.render('register')
});
router.get("/", async (req, res) => {

    res.render('home', { isLoggedIn: req.session.user ? true : false });



})
router.get("/login", async (req, res) => {

    res.render('login')

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
