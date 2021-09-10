const dbValidator = require('./db-validators'); 
const generarJWT = require('./generadorJWT'); 
const googoeverify = require('./googleVerify'); 
const subirArchivo = require('./subir-archivo'); 

module.exports = {
    ...dbValidator,
    ...generarJWT,
    ...googoeverify,
    ...subirArchivo
}