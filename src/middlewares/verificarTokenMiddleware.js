import { verificarToken } from "../utilidades/verificarToken.js"

export const verificarTokenMiddleware = (req, res, next) => {
  const token = req.session.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Token de acceso no proporcionado" });
  }

  try {
    const decoded = verificarToken(token);
    //guardar en el usuario que se verificó ok
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token de acceso invalido" });
  }
};
