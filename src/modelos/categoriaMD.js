//modelo de datos de CATEGORIAS
import mongoose from "mongoose";

const categoriaModelo = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
});

export default mongoose.model("categoria", categoriaModelo);
