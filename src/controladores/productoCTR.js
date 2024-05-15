import Productos from "../modelos/productosMD.js";

export const crearProducto = async (req, res) => {
  try {
    let destacado = req.body.destacado;
    destacado = destacado === "true";
    const datosProducto = new Productos(req.body);
    const { codigo } = datosProducto;
    const existeProducto = await Productos.findOne({ codigo });
    if (existeProducto) {
      res
        .status(400)
        .json({ message: `ya existe un producto con el <codigo:${codigo}>` });
    }
    await datosProducto.save();
    res.status(200).json({
      message: `el producto <${datosProducto.nombre}> a sido guardado correctamente`,
    });
  } catch (error) {
    res.status(500).json({ message: "error de servidor", error });
  }
};

export const obtenerProductos = async (req, res) => {
  try {
    const productos = await Productos.find().populate("categoria").lean();
    if (productos.length > 0) {
      res.status(200).json(productos);
    } else {
      res.status(400).json({ message: "No hay productos que mostrar" });
    }
  } catch (error) {
    res.status(500).json({ message: "error de servidor ", error });
  }
};

export const buscarProductos = async (req, res) => {
  try {
    const nombreBusqueda=req.params.nombre
   // const nombreFormateado= nombre.trim().toLowerCase();

    //const productoExiste = await Productos.find({$text:{$search: nombreBusqueda}})
    const productoExiste=await Productos.find({nombre:nombreBusqueda})
    if(!productoExiste){
      res.status(400).json({message:`el producto <${nombreBusqueda}> no se encuentra`})
    }else{
      res.status(200).json(productoExiste)
    }
  } catch (error) {
    res.status(500).json({ message: "error de servidor ", error });
  }
};

export const modificarProducto = async (req, res) => {
  try {
    const _id = req.params.id;
    const datosProducto = new Productos(req.body);
    const existeProducto = await Productos.findOne({ _id });
    if (existeProducto) {
      await Productos.findByIdAndUpdate({ _id }, req.body, { new: true });
      res.status(200).json({
        message: `el producto <id:${_id}> a sido modificado correctamente`,
      });
    } else {
      res
        .status(400)
        .json({ message: "No se encuentra el producto en la base de datos" });
    }
  } catch (error) {
    res.status(500).json({ message: "error del servidor", error });
  }
};
export const borrarProducto = async (req, res) => {
  try {
    const _id = req.params.id;
    const productoExiste = await Productos.findOne({ _id });
    if (!productoExiste) {
      return res.status(400).json({ message: "Producto no encotrado" });
    }
    await Productos.findByIdAndDelete({ _id });
    res
      .status(200)
      .json({ message: `Producto <id:${_id}>  borrado correctamente` });
  } catch (error) {
    res.status(500).json({ message: "Error de servidor", error });
  }
};
