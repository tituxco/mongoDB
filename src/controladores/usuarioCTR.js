import Usuarios from "../modelos/usuarioMD.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const crearUsuario = async (req, res) => {
  try {
    const datosUsuario = new Usuarios(req.body);
    const { email } = datosUsuario;
    const usuarioExiste = await Usuarios.findOne({ email });
    if (usuarioExiste) {
      res.status(400).json({ message: `el email: <${email}> ya esta en uso` });
    }
    await datosUsuario.save();
    res
      .status(200)
      .json({ message: `El usuario ${email} se ha creado correctamente` });
  } catch (error) {
    res.status(500).json({ message: "error de servidor ", error });
  }
};

export const obtenerUsuarios = async (req, res) => {
  try {
    //si el usuario que inicio sesion es un administrador permitimos que vea el listado de usuarios, 
    //de lo contrario informamos
    if (req.usuario.usuarioPrivilegios == "ADMINISTRADOR") {      
      const usuarios = await Usuarios.find();
      res.status(200).json(usuarios);
    } else {
      res
        .status(400)
        .json({
          message:
            "Sus privilegios de usuario no permiten el listado de usuarios",
        });
    }
  } catch (error) {
    res.status(500).json({ message: "Error de servidor", error });
  }
};

export const modificarUsuario = async (req, res) => {
  try {
    const _id = req.params.id;
    const datosUsuario = new Usuarios(req.body);
    const usuarioExiste = await Usuarios.findOne({ _id });
    if (!usuarioExiste) {
      res.status(400).json({ message: `el usuario <id:${_id}> no existe` });
    }
    await Usuarios.findByIdAndUpdate({ _id }, datosUsuario, { new: true });
    res.status(200).json({
      message: `el usuario <id:${id}> se ha modificado correctamente`,
    });
  } catch (error) {
    res.status(500).json({ message: "error de servidor ", error });
  }
};

export const borrarUsuario = async (req, res) => {
  try {
    const _id = req.params.id;
    const usuarioExiste = await Usuarios.findOne({ _id });
    if (!usuarioExiste) {
      res.status(400).json({ message: `el usuario <id:${_id}> no existe` });
    }
    await Usuarios.findByIdAndDelete({ _id });
    res.status(200).json({
      message: `el usuario <id:${_id}> se ha eliminado correctamente`,
    });
  } catch (error) {
    res.status(500).json({ message: "error de servidor ", error });
  }
};

export const validarUsuario = async (req, res) => {
  try {
    const email = req.body.email;
    const usuarioExiste = await Usuarios.findOne({ email }).lean();
    if (!usuarioExiste) {
      res.status(400).json({
        message:
          "Usuario inexistente, por favor verifique los datos ingresados",
      });
    }
    //validacion
    if (bcrypt.compareSync(req.body.password, usuarioExiste.password)) {
      const payload = {
        usuarioId: usuarioExiste._id,
        usuarioMail: usuarioExiste.email,
        usuarioPrivilegios: usuarioExiste.tipoUsuario,
      };
      //console.log (payload)
      //firmar token
      const token = jwt.sign(payload, "secreto", { expiresIn: "1h" });
      req.session.token = token;
      console.log(req.session.token);
      res.status(200).json({
        message: `Usuario <${usuarioExiste.email} se ha logueado correctamente`,
      });
    } else {
      res.status(400).json({
        message:
          "error de autenticacion de usuario, por favor verifique los datos ingresados",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Error de servidor ", error });
  }
};
export const cerrarSesionUsuario = (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res
        .status(400)
        .json({ message: "no se pudo cerrar sesion de usuario ", error });
    }
    res
      .status(200)
      .json({ message: "La sesion de usuario se cerro correctamente" });
  });
};
