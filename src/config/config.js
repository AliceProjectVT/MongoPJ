import { mongoose, connect } from "mongoose";
import dotenv from 'dotenv'

dotenv.config()


const configObject = {
    port: process.env.PORT,
    mongo_url: process.env.MONGO_URL,

}
console.log(configObject)

const conectDB = async () => {
    try {
        console.log('Conectado a Mongo en la nube')
        return await connect(process.env.MONGO_URL);
    } catch (error) {

        console.log(`Error al conectar: ${error}`);
    }
}
export default conectDB