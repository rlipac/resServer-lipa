const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos, varlidarArchivoAlSubir } = require('../middlewares');
 const { cargarArchivo, actualizarImagen, actualizarImagenNube  } = require('../controllers/uploadsController');
const { coleccionesPermitidas} = require('../helpers');
const router = Router();

router.post('/', varlidarArchivoAlSubir, cargarArchivo );


router.put('/:coleccion/:id', [
    varlidarArchivoAlSubir,
    check('id', 'No es un mongoId').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos'])),
    validarCampos
],  actualizarImagenNube );
// //],  actualizarImagen );




// router.get('/:coleccion/:id', [
//     check('id', 'No es un mongoId').isMongoId(),
//     check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos'])),
//     validarCampos

// ],  obtenerImagen );


module.exports = router;
