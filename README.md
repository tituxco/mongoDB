# Proyecto Backend: Sistema de Gestión de Usuarios, Productos y Categorías

Proyecto realizado en javascript con base de datos en MongoDB, backend con autenticación mediante token json

## Características principales

- **Usuarios:** Permite registrar nuevos usuarios, autenticar usuarios existentes, actualizar información de usuario y eliminar cuentas de usuario.
- **Productos:** Permite la creación, lectura, actualización y eliminación de productos.
- **Categorías:** Proporciona operaciones CRUD para gestionar categorías de productos.
- **Autenticación:** Utiliza un sistema de autenticación basado en tokens para proteger las rutas y operaciones sensibles.

## Tecnologías utilizadas

- **Node.js:** Plataforma de desarrollo utilizada para ejecutar el servidor backend.
- **Express.js:** Framework de Node.js utilizado para crear y gestionar las rutas de la API.
- **MongoDB:** Base de datos NoSQL utilizada para almacenar la información de usuarios, productos y categorías.
- **Mongoose:** Biblioteca de modelado de objetos MongoDB para Node.js, utilizada para definir los modelos de datos y realizar operaciones de base de datos.
- **JSON Web Tokens (JWT):** Utilizado para autenticar usuarios y generar tokens de acceso seguros.
- **bcrypt:** Biblioteca utilizada para el cifrado de contraseñas y garantizar la seguridad de las credenciales de usuario.

## Configuración del proyecto

1. Clona este repositorio en tu máquina local.
2. Instala las dependencias del proyecto ejecutando `npm install`.
3. Configura las variables de entorno.
4. Inicia el servidor ejecutando `npm run dev`.

## Uso de la API

La API proporciona los siguientes endpoints:

- **Usuarios:**
  - Crear Usuario
    - Método: POST
    - Ruta: `api/usuarios/crearUsuario`
  - Obtener Todos los Usuarios (con usuario logueado y tipo **administrador**)
    - Método: GET
    - Ruta: `api/usuarios/obtenerUsuarios`
  - Actualizar Usuario por ID (con usuario logueado y tipo **administrador**)
    - Método: PUT
    - Ruta: `api/usuarios/modificarUsuario/:id`
  - Eliminar Usuario por ID (con usuario logueado y tipo **administrador**)
    - Método: DELETE
    - Ruta: `api/usuarios/borrarUsuario/:id`
  - Iniciar Sesión
    - Método: POST
    - Ruta: `api/usuarios/validarUsuario`
    - Proporcionar email y password

- **Productos:**
  - Crear Producto
    - Método: POST
    - Ruta: `api/productos/crearProducto`
  - Obtener Todos los Productos
    - Método: GET
    - Ruta: `api/productos/obtenerProductos`
  - Obtener Producto por Nombre
    - Método: GET
    - Ruta: `api/productos/buscarProductos/:nombre`
  - Eliminar Producto por ID
    - Método: DELETE
    - Ruta: `api/productos/borrarProducto/:id`
  - Actualizar Producto por ID
    - Método: PUT
    - Ruta: `api/productos/modificarProducto/:id`

- **Categorías:**
  - Obtener Todas las Categorías 
    - Método: GET
    - Ruta: `api/categorias/obtenerCategorias`
  - Crear Categoría
    - Método: POST
    - Ruta: `api/categorias/crearCategoria`
  - Modificar Categoria
    - Método: PUT
    - Ruta: `api/categorias/modificarCategoria/:id`
  - Eliminar Categoría
    - Método: POST
    - Ruta: `api/categorias/borrarCategoria/:id`	
