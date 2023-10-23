import { Router } from "express";
import productsManagerMongo from "../Daos/Mongo/productManager.js";


const productManager = new productsManagerMongo();


const router = Router()

router.post("/", async (req, res) => {
    try {
        
        const newProduct = req.body

        let result = await productManager.createProduct(newProduct)
        res.send({
            status: 'success',
            payload: result
        })
    } catch (error) {
        console.log(error)
    }

})

router.get("/", async (req, res) => {
    const {limit= 1, page= 1}= req.query
    res.send(await productManager.getProducts())
})

router.get("/:_id", async (req, res) => {
    let id = req.params._id
    res.send(await productManager.getProductByID(id))

})

router.delete("/:_id", async (req, res) => {
    let id = req.params._id
    res.send(await productManager.deleteProduct(id))

})

router.put("/:_id", async (req, res) => {
    let id = req.params._id
    let updateProduct = req.body
    res.send(await productManager.updateProduct(id, updateProduct))


})


export default router

