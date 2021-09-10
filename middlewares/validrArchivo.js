const { response } = require("express");

const varlidarArchivoAlSubir = ( req, res= response , next) => {
   // verifica si axiste archiovos a subir
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
       return  res.status(400).json({
            msg :'no hay archivos que subir - validando si hay archivos para subir' }
            );
       
      }
      
      next();
}

module.exports = {
    varlidarArchivoAlSubir
}