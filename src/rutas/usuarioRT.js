import express from "express";
import {
  borrarUsuario,
  cerrarSesionUsuario,
  crearUsuario,
  modificarUsuario,
  obtenerUsuarios,
  validarUsuario,
} from "../controladores/usuarioCTR.js";
import { verificarTokenMiddleware } from "../middlewares/verificarTokenMiddleware.js";

const rutasUsuario = express.Router();

//rutas para api rest
rutasUsuario.post("/crearUsuario", crearUsuario);
rutasUsuario.get("/obtenerUsuarios", verificarTokenMiddleware, obtenerUsuarios);
rutasUsuario.put(
  "/modificarUsuario/:id",
  verificarTokenMiddleware,
  modificarUsuario
);
rutasUsuario.delete(
  "/borrarUsuario/:id",
  verificarTokenMiddleware,
  borrarUsuario
);
rutasUsuario.get("/validarUsuario", validarUsuario);
rutasUsuario.get(
  "/cerrarSesionUsuario",
  verificarTokenMiddleware,
  cerrarSesionUsuario
);

export default rutasUsuario;
