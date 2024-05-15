import mongoose from "mongoose";
import { estructuraContrasena } from "../utilidades/validadores.js";
import bcrypt from "bcrypt";

const tipoUsuarioEnum = ["ADMINISTRADOR", "VENDEDOR", "GERENTE"];

const usuarioModelo = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    maxlength: 16,
    minlength: 2,
    trim: true,
    lowercase: true,
  },

  apellido: {
    type: String,
    required: true,
    maxlength: 16,
    minlength: 2,
    trim: true,
    lowercase: true,
  },

  email: {
    type: String,
    required: true,
    maxlength: 30,
    minlength: 8,
    trim: true,
    lowercase: true,
    match: /^\S+@\S+\.\S+$/,
    unique: true,
  },

  tipoUsuario: {
    type: String,
    required: true,
    enum: tipoUsuarioEnum,
    validate: {
      validator: function (v) {
        return tipoUsuarioEnum.includes(v);
      },
      message: (props) => `${props.value} no es un tipo de usuario valido`,
    },
  },

  edad: {
    type: Number,
    required: true,
    min: 17,
    max: 120,
  },

  fechaRegistro: {
    type: Date,
    default: Date.now(),
  },

  password: {
    type: String,
    validate: {
      validator: function (value) {
        return estructuraContrasena(value);
      },
      message:
        "La contraseña debe tener entre 6 y 12 caracteres, un digito numerico, una letra minuscula, una letra mayuscula",
    },
  },
});

usuarioModelo.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

export default mongoose.model("usuarios", usuarioModelo);
