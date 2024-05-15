import express from "express";
import { verificarTokenMiddleware } from "../middlewares/verificarTokenMiddleware.js";
import {
  borrarProducto,
  buscarProductos,
  crearProducto,
  modificarProducto,  
  obtenerProductos,
} from "../controladores/productoCTR.js";

const rutasProductos = express.Router();

//rutas para api rest
rutasProductos.post("/crearProducto", verificarTokenMiddleware, crearProducto);
rutasProductos.get(
  "/obtenerProductos",
  verificarTokenMiddleware,
  obtenerProductos
);
rutasProductos.put(
  "/modificarProducto/:id",
  verificarTokenMiddleware,
  modificarProducto
);
rutasProductos.delete(
  "/borrarProducto/:id",
  verificarTokenMiddleware,
  borrarProducto
);
rutasProductos.get(
  "/buscarProducto/:nombre",
  verificarTokenMiddleware,
  buscarProductos
);
export default rutasProductos;
