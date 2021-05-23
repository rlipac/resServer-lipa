const { response, request } = require('express');

const esAdminRol = ( req, res = response, next ) =>{

  if(!req.usuario){
    return res.status(500).json({
      msg: 'se requiere verificar primero el token si es valido'
    });
  }
  const { role, name }= req.usuario;

  if( role != 'ADMIN_ROLE'){
    return res.status(401).json({
      msg: ` eL USUARIO ${name} no tiene los provilejos de ADMINISTRADOR`
    });
  }
  next();
}

const tieneRole = ( ...roles ) =>{
  return ( req= request, res = reponse, next ) =>{

    if(!req.usuario){
      return res.status(500).json({
        msg: 'se requiere verificar primero el token si es valido'
      });
    }
    if(!roles.includes( req.usuario.role ) ){
      return res.status(402).json({
        msg: `se requiere ALGUNO DE ESTOS ROLES => ${roles}`
      });
    }
   
    console.log( 'rolde mi usuario ==> '.blue  + req.usuario.role);
    next();
  }
}


module.exports = {
  esAdminRol,
  tieneRole
}
