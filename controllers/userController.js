const { response, request } = require('express');

 const userList =  (req = request , res = response) => {
   const {q, categoria, pagina= 1, limite=5} = req.query;
  res.status(200).json({
    msg: 'get API - Conctroller',
    q, categoria, pagina, limite
  });
}

const userUpdate =  (req, res = response) => {
  const { id } = req.params;
  res.status(200).json({
    msg: 'PUT - API - Conctroller',
    id
  });
}

const userPatch =  (req, res = response) => {
  res.status(200).json({
    msg: 'PATCH - API - Conctroller'
  });
}

const userSave =  (req, res = response) => {
    const { name, edad, sueldo } = req.body
  res.json({
    msg: 'POST - API - Conctroller',
    name, edad, sueldo
   
  });
}

const userDelete =  (req, res = response) => {
  res.status(200).json({
    msg: 'DELETE - API - Conctroller'
  });
}




module.exports = {
  userList,
  userUpdate,
  userPatch,
  userSave,
  userDelete
}