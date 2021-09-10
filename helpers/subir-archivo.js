const path = require('path')
const { v4: uuidv4 } = require('uuid');

const subirArchivo = (files, extensionesValidas = ['jpg', 'jpeg', 'png', 'gif'], carpeta = '') =>{
      
    return new Promise( (resolve, reject) => {


        const { archivo } = files;
        const nameCortado = archivo.name.split('.');
        const extension = nameCortado[nameCortado.length-1];
      
    
        // validar extensiones
        if( !extensionesValidas.includes( extension )) {
           return   reject( `La extension .${extension} del archivo ${archivo.name} no es valida, solo se permiten archivos ${extensionesValidas}`)
       
        }
    
        // dando nombre unico al archivo con uuid
        const nameUnicoDelArchivo = uuidv4() + '.' + extension;
        const uploadPath = path.join( __dirname, '../uploads/', carpeta, nameUnicoDelArchivo);
    
        archivo.mv(uploadPath, function(err) {
            if (err) {
                reject(err)
            
            }
            resolve(nameUnicoDelArchivo);
       
        });
    })


      
}

module.exports= {
    subirArchivo
}