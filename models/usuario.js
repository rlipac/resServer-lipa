const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
      name:{
        type: String,
        required: [ true, 'El nombre es obligatorio']
      },
      email:{
        type: String,
        required: [ true, 'email obligatorio'],
        unique:true
      },
      password:{
        type: String,
        required: [ true, 'El pasword es obligatorio']
      },
      images:{
        type: String
      },
      role:{
        type: String,
        required: [ true, 'Definir Rol es obligatorio'],
        emun: [ 'ADMIN_ROLE', 'USER_ROLE' ]
      },
      estado:{
        type: Boolean,
      default: true
      },
      google:{
        type: Boolean,
      default: false
      }
});

UsuarioSchema.methods.toJSON = function(){
  const {__v, password, ...viewUsuario} = this.toObject();
  return viewUsuario
}

module.exports = model( 'Usuario', UsuarioSchema );