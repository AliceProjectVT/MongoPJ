import {Schema, model}from "mongoose"

const collection = 'products'
const productsSchema  = new  Schema({
    product_name:{
        type: String,
        required: true,
        unique:true
    }, 
    product_description:{
        type:String,
        required:true
    },
    product_price:{
        type: Number,
        required:true,
       
    },
    stock:{
        type: Number,
        required:true,
        
    }

})

const producstModel = model(collection, productsSchema)

export default producstModel