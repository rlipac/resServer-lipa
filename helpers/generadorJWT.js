const jwt = require("jsonwebtoken");



const generarJWT = ( uid='') =>{
   return new Promise( ( resolve, reject) => {
      const payload = { uid };
      jwt.sign( payload, process.env.SECRET_OR_PRIVATE_KEY, {
        expiresIn: '5h'
      }, (err, token) => {
          if(err){
            console.log(`el error es este ==> ${err}`);
            reject('no se pudo generar el token devido al un error');
          }else{
            resolve( token );
          }
      })
   })
  }


module.exports = {
  generarJWT
}