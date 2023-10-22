import {mongoose, connect} from "mongoose";

const conectDB = async ()=>{ 
    try{        
        console.log('Conectado a Mongo en la nube')
        return await connect('mongodb+srv://islamartinezd:estoesunaclavesegura@nubecita.m8fbcsp.mongodb.net/?retryWrites=true&w=majority')
    }   catch(error){
        
        console.log(`Error al conectar: ${error}`);
    }
    }
export default conectDB