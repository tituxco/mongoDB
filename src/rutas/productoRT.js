import express from "express";
import {verificarTokenMiddleware} from "../middlewares/verificarTokenMiddleware.js"
import { crearProducto, obtenerProductos } from "../controladores/productoCTR.js";

const rutasProductos=express.Router();

//endpoints
rutasProductos.post("/crearProducto",verificarTokenMiddleware, crearProducto)
rutasProductos.get("/obtenerProductos",verificarTokenMiddleware,obtenerProductos)

export default rutasProductos