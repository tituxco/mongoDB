import { request } from "express";
import mongoose from "mongoose";

const estadoProductosEnum = ["DISPONIBLE", "AGOTADO", "DISCONTINUADO"];

const productoModelo = new mongoose.Schema({
  codigo: {
    type: String,
    unique: true,
    index:true
  },
  nombre: {
    type: String,
    required: [true, "El nombre del producto es requerido"],
    minLength: 3,
    lowercase: true,
    trim: true,
  },
  precio: {
    type: Number,
    required: [true, "El precio del producto es requerido"],
    min: [0, "El precio del producto debe ser un numero"],
    //Al consultar precio multiplica el valor guardado
    get: function (value) {
      return value * 1.21;
    },
  },
  descripcion: {
    type:String,
  },
  stock: Number,

  estado: {
    type: String,
    required: true,
    enum: estadoProductosEnum,
    validate: {
      validator: function (v) {
        return estadoProductosEnum.includes(v);
      },
      message: (props) => `${props.value} no es un estado de producto valido`,
    },
  },
  categoria: { type: mongoose.Schema.Types.ObjectId, ref: "categorias" },
  destacado: Boolean,
});

productoModelo.index({nombre:'text',descripcion:'text'})
productoModelo.set("toJSON", { getters: true, setters: true });
export default mongoose.model("productos", productoModelo);
