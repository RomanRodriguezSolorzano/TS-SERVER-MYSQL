import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Usuario from "../models/usuario";

export const validarIDyEstado = async (
  req: Request,
  res: Response,
  next: Function
) => {
  const { id } = req.params;
  const usuario = await Usuario.findByPk(id);
  const estado = usuario?.getDataValue("estado");
  if (!usuario || !estado) {
    return res.status(404).json({
      msg: `El usuario con el id "${id}" no existe`,
    });
  }
  next();
};

export const validarEmail = async (
  req: Request,
  res: Response,
  next: Function
) => {
  const { email } = req.body;
  if (email) {
    const usuario = await Usuario.findOne({ where: { email } });
    if (usuario) {
      return res.status(400).json({
        msg: `El email ${email} no es valido`,
      });
    }
  }
  next();
};

export const validacion = (req: Request, res: Response, next: Function) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json(error);
  }
  next();
};
