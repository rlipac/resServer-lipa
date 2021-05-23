const { response, request } = require('express');
const  bcrypt = require('bcryptjs');

const  Usuario = require('../models/usuario');


 const userList = async (req = request , res = response) => {
  //  const {name, email, role, password} = req.query;
  const  { limite, desde, pagina=1 } = req.query;
  const query = {estado: true };

  
    if(isNaN(req.query)  ){  
          const [ totalRegisters, usuarios ] = await Promise.all([
              Usuario.countDocuments(query),
              Usuario.find(query)
          ]);
          res.json({
            totalRegisters,
            usuarios 
           })
    
    }else{
      const [ totalRegisters, usuarios ] = await Promise.all([
         Usuario.countDocuments(query),
         Usuario.find(query)
                .skip( Number( desde ))
                .limit( Number( limite ) )
      ]);
      res.json({
        totalRegisters,
        usuarios
      })
    } 
}

const userUpdate = async  (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google,  ...resto } = req.body;
  // TODO validar contra base de datos
  if( password ){
    // encriptar contraseña
    const salt = bcrypt.genSaltSync();
    resto.password = bcrypt.hashSync( password, salt );
  }
  const usuario = await Usuario.findByIdAndUpdate( id, resto, {new:true} ); // new true para que me devuelva el usuaio actualizado
    
  res.status(200).json({
    msg: 'PUT - API - Conctroller',
    usuario
  });
}

const userPatch =  (req, res = response) => {
  res.status(200).json({
    msg: 'PATCH - API - Conctroller'
  });
}

const userSave = async (req , res = response) => {

  
    const { name, email, password, role } = req.body
  
    const usuario = new Usuario({name, email, password, role});
  
    // encriptar contraseña
   const salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync(password, salt);

    //Guardar el Usuario
     await usuario.save();
     console.log('SE GURADO USUARIO');
    res.status(200).json({
      usuario
    });
}

const userDelete = async (req= request, res = response) => {
  const { id } = req.params;

  const uid = req.uid;// cambiando el _id del la bd por uid del token
  // BORRADO FISICO DE LA DB
//  const userDelete = await Usuario.findByIdAndDelete(id);
// borrado logico para el frontend
 const usuarioUatenticado = req.usuario;
const userDelete = await Usuario.findByIdAndUpdate( id, {estado: false} );
  res.status(200).json({
   
    userDelete,
    usuarioUatenticado
   
  });
}




module.exports = {
  userList,
  userUpdate,
  userPatch,
  userSave,
  userDelete
}