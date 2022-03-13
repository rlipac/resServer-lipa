const { response, request} = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async (req=request, res= response, next) =>{
  const token = req.header('token-cafe');

 // console.log(` este es mi token ==>  ${token}`.bgBrightWhite.black);

  if(!token){
    return res.status(401).json({
      msg: 'No existe token en el Header de la peticion'
    })
  }

  try {
    const { uid }= jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);

    // req.uid = uid;
    const usuario = await Usuario.findById(uid);
  
    if( !usuario || !usuario.estado  ){
      return res.status(401).json({
        msg: ' EL USUARIO NO  EXISTE'
      })
    }else{
      
      req.body.id_usuario = uid; // mandamos al body el id del usuario
     // console.log('usuario id == =>> ',uid)
    }

  
    req.usuario = usuario; // contiene los datos del usuario devuelts de la peticion request
   // console.log(uid);
    next();
  } catch (error) {
      console.log(error);
      res.status(402).json({
        msg:'Token invalido'
      })
  }

  
}

module.exports = {
  validarJWT
}