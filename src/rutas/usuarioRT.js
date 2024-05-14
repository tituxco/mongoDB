import express from "express";
import { borrarUsuario, cerrarSesionUsuario, crearUsuario, modificarUsuario, validarUsuario } from "../controladores/usuarioCTR.js";
import { verificarTokenMiddleware } from "../middlewares/verificarTokenMiddleware.js";

const rutasUsuario=express.Router();

//endpoints
rutasUsuario.post("/crearUsuario",crearUsuario)
rutasUsuario.put("/modificarUsuario/:id",verificarTokenMiddleware,modificarUsuario)
rutasUsuario.delete("/borrarUsuario/:id",verificarTokenMiddleware,borrarUsuario)
rutasUsuario.get("/validarUsuario",validarUsuario)
rutasUsuario.get("/cerrarSesionUsuario",cerrarSesionUsuario)

export default rutasUsuario