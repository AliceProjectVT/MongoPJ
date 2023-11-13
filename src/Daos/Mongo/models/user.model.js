import { Schema, model, mongoose } from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"
import bcrypt from "bcrypt"
const saltRound = 10;





const usercollection = 'users'



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
    role: {
        type: String,
        enum: ['user', 'user_premium', 'admin'],
        default: 'user'
    }

})
// userSchema.pre('save', async function (next) {
//     try {
//         const emailExist = await mongoose.model('users').findOne({ email: this.email })
//         if (emailExist) {
//             throw new Error('El Correo ya se encuentra en uso.')
//         }
//         next()

//     } catch (error) {
//         next(error)
//     }

// })
userSchema.plugin(mongoosePaginate)

const userModel = model(usercollection, userSchema)

export default userModel