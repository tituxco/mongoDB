import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import session from "express-session";
import { conectarBD } from "./bd.js";
import { PUERTO_EX } from "./configuracion.js";
import rutasCategorias from "./src/rutas/categoriaRT.js";
import rutasUsuario from "./src/rutas/usuarioRT.js";
import rutasProductos from "./src/rutas/productoRT.js";

//creamos una instancia del servidor express
const app = express();
//configuramos el middleware para analizar las solicitudes entrantes con formato json
app.use(bodyParser.json());
// configuramos middleware para analizar solicitudes entrantes codificados en url (formularios)
//estableciendo el parametro <extended> a true admitimos objetos y matrices complejos
app.use(bodyParser.urlencoded({ extended: true }));
//permite simular métodos HTTP (como PUT o DELETE) en formularios HTML.
app.use(methodOverride("_method"));
//configuramos el middleware de sesiones para mantener el estado de los usuarios a lo largo de las solicitudes
app.use(
  session({
    secret: "secreto", //firmamos las cookies de sesion con una clave secreta
    resave: false, //evitar que se guarde si no hay datos
    saveUninitialized: false, //evita que se guarde una sesion que no se inicializo    
  })
);

//conectamos la base de datos
conectarBD();

//rutas de la aplicacion

//rutas de categorias
app.use("/api/categorias", rutasCategorias);

//rutas de usuario
app.use("/api/usuarios", rutasUsuario);

//rutas productos
app.use("/api/productos", rutasProductos);

app.listen(PUERTO_EX, () => {
  console.log(`Servidor corriendo en: http://localhost:${PUERTO_EX}`);
});
