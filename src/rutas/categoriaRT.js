import { Router } from "express";
import {
  obtenerCategorias,
  crearCategoria,
  borrarCategoria,
  crearCategoriasVista,
  modificarCategoria,
} from "../controladores/categoriaCTR.js";
import { verificarTokenMiddleware } from "../middlewares/verificarTokenMiddleware.js";

const rutasCategorias = Router();

//rutas para api rest
rutasCategorias.post("/crearCategoria", verificarTokenMiddleware, crearCategoria);
rutasCategorias.delete("/borrarCategoria/:id", verificarTokenMiddleware, borrarCategoria);
rutasCategorias.put("/modificarCategoria/:id",verificarTokenMiddleware, modificarCategoria)

export default rutasCategorias;