import { Router } from "express";
import { check } from "express-validator";

import {
  validarIDyEstado,
  validacion,
  validarEmail,
} from "../middleware/validar-usuarios";

import {
  deleteUsuario,
  getUsuario,
  getUsuarios,
  postUsuario,
  putUsuario,
} from "../controllers/usuario";

const router = Router();

router.get("/", getUsuarios);

router.get(
  "/:id",
  [
    validarIDyEstado,
  ],
  getUsuario
);

router.post(
  "/",
  [
    check("nombre", "Debe de enviar el nombre").notEmpty(),
    check("email", "Se debe de enviar el email").notEmpty(),
    check("email", "Debe enviar un email valido").isEmail(),
    validacion,
    validarEmail,
  ],
  postUsuario
);

router.put(
  "/:id",
  [
    validarIDyEstado,
    validarEmail
  ],
  putUsuario
);

router.delete(
  "/:id",
  [
    validarIDyEstado
  ],
  deleteUsuario
);

export default router;
