import {Schema, model}from "mongoose"

const collection = 'users'
const userSchema  = new  Schema({
    first_name:{
        type: String,
        required: true
    }, 
    last_name:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique:true
    }

})

const userModel = model(collection, userSchema)

export default userModel