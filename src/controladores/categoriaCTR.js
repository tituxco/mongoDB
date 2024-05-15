import Categorias from "../modelos/categoriaMD.js";

export const obtenerCategorias = async (req, res) => {
  try {
    const categorias = await Categorias.find().lean();
    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ message: "Error de servidor", error });
  }
};

export const crearCategoria = async (req, res) => {
  try {
    const nombre = req.body.nombre;
    const categoriaExiste = await Categorias.findOne({ nombre });
    if (categoriaExiste) {
      res.status(400).json({ message: "La categoria ya existe" });
    } else {
      const nuevaCategoria = new Categorias({ nombre });
      await nuevaCategoria.save();
      res
        .status(200)
        .json({
          message: `Categoria <${nuevaCategoria.nombre}> creada correctamente`,
        });
    }
  } catch (error) {
    res.status(500).json({ message: "Error de servidor", error });
  }
};

export const borrarCategoria = async (req, res) => {
  try {
    const _id = req.params.id;
    const categoriaExiste = await Categorias.findOne({ _id });
    if (!categoriaExiste) {
      return res.status(404).json({ message: "Categoria no encontrada" });
    }
    await Categorias.findByIdAndDelete({ _id });
    res
      .status(200)
      .json({ message: `Categoria <id:${_id}>  borrada correctamente` });
  } catch (error) {
    res.status(500).json({ message: "Error de servidor", error });
  }
};

export const modificarCategoria = async (req, res) => {
  try {
    const _id = req.params.id;    
    const categoriaExiste = await Categorias.findOne({ _id });
    if (!categoriaExiste) {
      res.status(404).json({ message: "La categoria solicitada no existe" });
    }
    await Categorias.findByIdAndUpdate({ _id }, req.body, { new: true });
    res
      .status(200)
      .json({ message: `La categoria <id:${_id}> se actualizo correctamente` });
  } catch (error) {
    res.status(500).json({ message: "Error de servidor", error });
  }
};
