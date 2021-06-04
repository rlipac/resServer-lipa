const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const { generarJWT } = require('../helpers/generadorJWT');
const { googleverify } = require('../helpers/googleVerify');
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
    
    res.status(200).json({
      msg: 'usuario - Login OK...',
      usuario,
      token
    })
  
  } catch (error) {
     throw new Error(`ALGO SALIO MAL Y el erro es de tipo ==> ${error}`);
    
  }


}


const googleSignin = async (req, res = response) =>{
  const { id_token } = req.body;

 // const googleUser = await googleverify( id_token );
 // destructuramos googleUser


    try {
      const { images , name, email } = await googleverify( id_token );
      
      let usuario = await Usuario.findOne({ email });

      if(!usuario){
        // I usuario no existe lo tengo que crear
          const data = {
            name,
            email,
            password: ':P',
            images,
            google:true
          };
          usuario = new Usuario(data);
          await usuario.save();
      }

      if(!usuario.estado){
        return  res.status(401).json({
          msg: ' Usuario Bloqueado Consulte con el administrador '
        })
      }

      // generar el JWT
    const token = await generarJWT( usuario.id);
  
      res.json({
        usuario,
        token
       
      })
      
    } catch (error) {
      res.status(404).json({
        msg: 'El Token de Google no es valido'
        
      })
      
    }
}

module.exports = {
  login,
  googleSignin
}