import Usuarios from "../modelos/usuarioMD.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const crearUsuario = async (req, res) => {
    try {
      // tomar datos de body (post)
      const datosUsuario = new Usuarios(req.body);
      // buscar si existe usuario (filtrar por email)
      //destructuracion
      const { email } = datosUsuario;
      const usuarioExiste = await Usuarios.findOne({ email });
      if (usuarioExiste) {
        res.status(400).json({message: `el email: ${email} ya esta en uso`})
        //return res.render("create", {
        //  message: `El email: ${email} ya está en uso`,
        //});
      }
      // guardar el usuario
      await datosUsuario.save();
      res.status(200).json({message: `Es usuario ${email} se ha creado correctamente`})
      //res.render("home");
    } catch (error) {
      res.status(500).json({ message: "error de servidor "+ error  });
    }
  };

  export const modificarUsuario=async(req,res)=>{
    try{
        const id=req.params.id
        const usuarioExiste=await Usuarios.findOne({_id:id})
        if(!usuarioExiste){
            res.status(404).json({message:`el usuario <${id}> no existe`})
        }
        await Usuarios.findByIdAndUpdate({_id:id},req.body,{new:true})
        res.status(200).json({message:`el usuario <id:${id}> se ha modificado correctamente`})
    }catch(error){
        res.status(500).json({message:"error de servidor " + error})
    }
  }
  
  export const borrarUsuario=async (req,res)=>{
    try{
        const id=req.params.id
        const usuarioExiste=await Usuarios.findOne({_id:id})
        if(!usuarioExiste){
            res.status(400).json({message:`el usuario <id:${id}> no existe`})            
        }
        await Usuarios.findByIdAndDelete({_id:id})
        res.status(200).json({message:`el usuario <id:${id}> se ha eliminado correctamente`})            
    }catch(error){
        res.status(500).json({message: "error de servidor " + error})
    }
  }

  export const validarUsuario = async (req, res) => {
    try {
      const usuarioExiste = await Usuarios.findOne({ email: req.body.email });      
      if (!usuarioExiste) {
        res
          .status(400)
          .json({ message: "Usuario inexistente, por favor verifique los datos ingresados" });
      }      
      //validacion      
      if (bcrypt.compareSync(req.body.password, usuarioExiste.password)) {        
        const payload = {
          usuarioId: usuarioExiste._id,
          usuarioMail: usuarioExiste.email,
        };
        //firmar token
        const token = jwt.sign(payload, "secreto", { expiresIn: "1h" });
        req.session.token = token;
        console.log(req.session.token);
        res.status(200).json({message: `Usuario <${usuarioExiste.email} se ha logueado correctamente`})
        //res.redirect("/api/user/getAll");
      } else {
        res.status(400).json({message:"error de autenticacion de usuario, por favor verifique los datos ingresados"})
        //res.render("login", {
        //  message: "El email y/o contraseña son incorrectos",
        //});
        //return;
      }
    } catch (error) {
      res.status(500).json({message: "Error de servidor " + error });
    }
  };
  export const cerrarSesionUsuario = (req, res) => {
    req.session.destroy(error => {
      if (error) {
        res.status(400).json({message: "no se pudo cerrar sesion de usuario " + error})
      }
      res.status(200).json({message:"La sesion de usuario se cerro correctamente"})
    });
  };