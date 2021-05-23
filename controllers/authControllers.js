const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const { generarJWT} = require('../helpers/generadorJWT');
const Usuario = require('../models/usuario');

const login = async (req= request, res= response) =>{
  const { email, password } = req.body;
  try {
    // Verificar si el email o usuario EXISTE
    const usuario =  await  Usuario.findOne({email});
    if(!usuario) {
        return  res.status(400).json({
            msg:'Email No REGISTRADO'
          });
    }
      // Si el ususario esta activo
    if(!usuario.estado) {
      return  res.status(400).json({
          msg:'Email INACTIVOoooo'
        });
     } 
    // verificvar si la contraseña es valida

     const validarPassword = bcrypt.compareSync( password, usuario.password);
     if(!validarPassword){
       return  res.status(400).json({
        msg:'PASSWORD INVALIDO'
       })
     }

    // generar el JWT
    const token = await generarJWT( usuario.id);
    console.log(`usuario.id ==> ${usuario.id}`.blue);
    res.status(200).json({
      msg: 'usuario - Login OK...',
      usuario,
      token
    })
  
  } catch (error) {
     throw new Error(`ALGO SALIO MAL Y el erro es de tipo ==> ${error}`);
    
  }


}

module.exports = {
  login
}