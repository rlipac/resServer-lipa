const { response, request } = require('express');
const { validationResult } = require('express-validator');

  
  

  const validarCampos = (req, res, next) =>{
    // capturando error de email
    const errors = validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json(errors);
      }
     next()
  }




  module.exports = {
    validarCampos
  }