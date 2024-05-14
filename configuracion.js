import dotenv from "dotenv";

dotenv.config();

//variable que establece el puerto de trabajo del servidor express
export const PUERTO_EX = process.env.PORT || 3001;