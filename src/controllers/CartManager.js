import { promises as fs } from 'fs'
import { nanoid } from 'nanoid'
import ProductManager from './ProductManager.js'


const productAll = new ProductManager
class CartManager {

    constructor() {
        this.path = "./src/models/carts.json"
    }

    readCarts = async () => {
        let cart = await fs.readFile(this.path, "utf-8")
        return JSON.parse(cart)
    }
    writeCarts = async (cart) => {
        await fs.writeFile(this.path, JSON.stringify(cart))
    }

    exist = async (id) => {
        let carts = await this.readCarts()
        return carts.find(cart => cart.id === id)
    }

    addCarts = async () => {
        let cartOld = await this.readCarts();
        let id = nanoid(3)
        let cartsConcat = [{ id: id, products: [] }, ...cartOld]
        await this.writeCarts(cartsConcat)
        return "Carrito Agregado"

    }

    getCartsByID = async (id) => {

        let cartByID = await this.exist(id)
        if (!cartByID) return "Carrito no encontrado"
        return cartByID

    }
    addProductInCart = async (cartID, productID) => {
        let cartByID = await this.exist(cartID)
        if (!cartByID) return "Carrito no encontrado"
        let productByID = await productAll.exist(productID)
        if (!productByID) return "Producto no encontrado"

        let cartsAll = await this.readCarts()
        let cartFilter = cartsAll.filter(cart => cart.id != cartID)

        if (cartByID.products.some(prod => prod.id === productID)) {
            let addAnProduct = cartByID.products.find(prod => prod.id === productID)
            addAnProduct.cantidad ++
            let cartsConcat = [cartByID, ...cartFilter]
            await this.writeCarts(cartsConcat)
            return "Producto Sumado al carrito"
        }
        cartByID.products.push({ id: productByID.id, cantidad: 1 })

        let cartsConcat = [cartByID, ...cartFilter]
        await this.writeCarts(cartsConcat)
        return "Producto Agregado al carrito"
    }


}

export default CartManager