const validarCampos  = require('./validarCampos');
const validarRoles = require('./validarRoles');
const validarTokens = require('./validarToken');
const varlidarArchivos = require('./validrArchivo');

module.exports = {
  ...validarCampos,
  ...validarRoles,
  ...validarTokens,
  ...varlidarArchivos
}