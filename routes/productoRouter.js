const { Router } = require("express");
const { check } = require("express-validator");

const router = Router();
 const { productoIdExiste } = require("../helpers/db-validators");
const { validarJWT, validarCampos, esAdminRol, tieneRole } = require("../middlewares");
const {
  crearProducto,
  listarProductos,
  obtenerProducto,
  updateProducto,
  DeleteProducto
} = require("../controllers/productoController");


router.post('/', [
                validarJWT,
                check("nameProducto", " el nombre del Producto  es obligatorio")
                  .not()
                  .isEmpty(),
                validarCampos,
              ],
          crearProducto);


router.get('/', listarProductos);


router.get(
  "/:id",
  validarCampos,
  [
    check("id", "el id no es valido").isMongoId(),
    check("id").custom(productoIdExiste),
  ],
  obtenerProducto
);

// actualizado - privado - cualqueira con token valido
router.put(
  "/:id",
  validarCampos,
  validarJWT,
  esAdminRol,
  [
    check("nameProducto", " el nombre del Producto  es obligatorio"),
    check("id", "el id no es valido").isMongoId(),
    check("id").custom(productoIdExiste),
  ],
  updateProducto
);

// //Privado - solo administrador
router.delete("/:id", [
  validarCampos,
  validarJWT,
  esAdminRol,
  check("id", "NO ES IN ID VALIDO").isMongoId(),
  check("id").custom(productoIdExiste),
],

DeleteProducto
);



module.exports= router;