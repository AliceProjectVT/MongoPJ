import { promises as fs } from 'fs'
import { nanoid } from 'nanoid'

class ProductManager {

    constructor() {
        this.path = "./src/models/products.json"
    }

    readProducts = async () => {
        let products = await fs.readFile(this.path, "utf-8")
        return JSON.parse(products)
    }
    writeProducts = async (product) => {

        await fs.writeFile(this.path, JSON.stringify(product))


    }

    exist = async (id) => {
        let products = await this.readProducts()
        return products.find(prod => prod.id === id)

    }

    addProducts = async (product) => {
        let productsOld = await this.readProducts();
        product.id = nanoid(3)
        let productAll = [...productsOld, product]
        await this.writeProducts(productAll);
        return "Agregaste un producto."
    }
    getProducts = async () => {
        return await this.readProducts()
    }
    getProductsByID = async (id) => {

        let productByID = await this.exist(id)
        if (!productByID) return "Producto no encontrado"
        return productByID

    }
    deleteProducts = async (id) => {
        let products = await this.readProducts();


        let existPoducts = products.some(prod => prod.id === id)
        if (existPoducts) {

            let filterProducts = products.filter(prod => prod.id != id)
            await this.writeProducts(filterProducts)
            return "Producto Eliminado con exito."
        }
        return "No hay existencias. Revisa que el ID sea correcto"
    }

    updateProducts = async (id, product) => {
        let productByID = await this.exist(id)
        if(!productByID) return "Producto no encontrado"
        await this.deleteProducts(id)
        let productOld = await this.readProducts()
        let products = [{...product, id : id},...productOld]
        await this.writeProducts(products)
        return "Producto Actualizado"
    
    
    }





}





export default ProductManager
///ESTE ARCHIVO DEBE ELIMINARSE.