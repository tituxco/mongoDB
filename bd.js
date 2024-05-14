import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

//declaramos la variable para obtener la direccion del servidor mongodb
const MONGOURI=process.env.MONGODB_URI;

//creamos la funcion de conexion a la base de datos
export const conectarBD=async ()=>{
    try{
        await mongoose.connect(MONGOURI);
        console.log("La base de datos se conecto correctamente")
    }catch(error){
        console.error("No se pudo conectar a la base de datos: ", error)
        process.exit(1)
    }
}