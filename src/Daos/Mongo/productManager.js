import productsModel from "./models/products.model.js";

class productsManagerMongo {
    constructor() {
        this.model = productsModel
    }


    async getProducts() {
        try {
            return await this.model.find({})

        } catch (error) {
            console.log(error)
        }
    }
    async getProductByID(pid) {
        return await this.model.findOne({ _id: pid })
    }
    async createProduct(newUser) {
        return await this.model.create(newUser)

    }
    async updateProduct(pid, newData) {

        const updatedProduct = await this.model.findByIdAndUpdate({_id : pid}, newData, { new: true });
        return updatedProduct;

    }



    
    async deleteProduct(pid){

    const deletedProduct = await this.model.findByIdAndDelete({ _id: pid });
    return deletedProduct;

}
}

export default productsManagerMongo