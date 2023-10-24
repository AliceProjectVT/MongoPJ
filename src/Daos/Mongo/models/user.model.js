import { Schema, model, mongoose } from "mongoose"
import bcrypt from "bcrypt"
const saltRound = 10;





const collection = 'users'



const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,


})
userSchema.pre('save', async function (next) {
    try {
        const emailExist = await mongoose.model('users').findOne({ email: this.email })
        if (emailExist) {
            throw new Error('El Correo ya se encuentra en uso.')
        }
        next()

    } catch (error) {
        next(error)
    }

})


const userModel = model(collection, userSchema)

export default userModel