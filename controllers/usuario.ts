import { Request, Response } from "express";
import { Op } from "sequelize";
import Usuario from "../models/usuario";

export const getUsuarios = async (req: Request, res: Response) => {
  const usuarios = await Usuario.findAll({
    where: {
      estado: {
        [Op.not]: 0
      }}});
  res.json({ usuarios });
};

export const getUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const usuario = await Usuario.findByPk(id);
  res.json(usuario);
};

export const postUsuario = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const usuario = await Usuario.create(body);
    await usuario.save();
    res.json({
      usuario,
      msg: "Usuario agregado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

export const putUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  const usuario = await Usuario.findByPk(id);
  await usuario?.update(body);
  res.json({
    usuario
  });
};

export const deleteUsuario = async(req: Request, res: Response) => {
  const { id } = req.params;
  const usuario = await Usuario.findByPk(id);
  await usuario?.update({estado:false});
  res.json({
    usuario
  });
};
