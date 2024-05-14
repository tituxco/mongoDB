import Productos from "../modelos/productosMD.js"


export const crearProducto = async (req, res) => {
    try {
      let destacado = req.body.destacado;
      destacado = destacado === "true";
      //const productoDestacado = { destacado, ...req.body };      
      const datosProducto = new Productos(req.body);
      const {codigo} = datosProducto;
      const existeProducto = await Productos.findOne({ codigo });
      if (existeProducto) {
       res.status(400).json({message:`ya existe un producto con el <codigo:${codigo}>`})
      }
      //res.status(200).json({message:"el producto no se encuentra en la bd"})
      await datosProducto.save()
      res.status(200).json({message: `el producto <${datosProducto.nombre}> a sido guardado correctamente`})
    } catch (error) {
      res.status(500).status({ message: "error de servidor" });
    }
  };

  export const obtenerProductos=async(req,res)=>{
    try {
      const productos=await Productos.find().lean();
      res.status(200).json(productos)  
    } catch (error) {
      res.status(500).json({message:"error de servidor " + error})
    }    
  }