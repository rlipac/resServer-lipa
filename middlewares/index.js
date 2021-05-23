const validarTodoCampos  = require('./validarCampos');
const validarRoles = require('./validarRoles');
const validarTokens = require('./validarToken');

module.exports = {
  ...validarTodoCampos,
  ...validarRoles,
  ...validarTokens
}