const { Router } = require("express");
const { check } = require("express-validator");

const router = Router();
const { categoriaIdExiste } = require("../helpers/db-validators");
const { validarJWT, validarCampos, esAdminRol, tieneRole } = require("../middlewares");
const {
  crearCategoria,
  listarCategorias,
  obtenerCategoria,
  categoriaUpdate,
  DeleteCategoria
} = require("../controllers/categoriasController");

// Obtener todas  las categorias - Publico - total - populate
router.get("/", listarCategorias);

// actualizado - privado - Obteenr categoria por su ID
router.get(
  "/:id",
  [
    check("id", "el id no es valido").isMongoId(),
    check("id").custom(categoriaIdExiste),
  ],
  validarCampos,
  obtenerCategoria
);

// crear una nueva categoria  - Privado con token valido
router.post(
  "/",
  [
    validarJWT,
    check("nameCatego", " el nombre de la categoria  es obligatorio")
      .not()
      .isEmpty(),
    validarCampos,
  ],
  crearCategoria
);

// actualizado - privado - cualqueira con token valido
router.put(
  "/:id",
  validarJWT,
  [
    check("nameCatego", " el nombre de la categoria  es obligatorio")
      .not()
      .isEmpty(),
    check("id", "el id no es valido").isMongoId(),
    check("id").custom(categoriaIdExiste),
  ],
  validarCampos,
  categoriaUpdate
);

//Privado - solo administrador
router.delete("/:id", [
  validarJWT,
  esAdminRol,
  check("id", "NO ES IN ID VALIDO").isMongoId(),
  check("id").custom(categoriaIdExiste),
],
validarCampos,
DeleteCategoria
);

module.exports = router;
