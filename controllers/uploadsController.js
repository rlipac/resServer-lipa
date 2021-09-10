const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL);

const { response, request } = require('express');


const { subirArchivo } = require('../helpers');
const { Usuario, Producto } = require('../models');
const { collection } = require('../models/usuario');


const cargarArchivo = async (req = request, res = response) => {
  const { carpeta } = req.body;
  const nombre = await subirArchivo(req.files, undefined, carpeta); // undefine es para que carguen permita las extensiones antes definidas y carpeta es el noobre de carpeta que se define en el body por el usuario

  res.json({
    nombre
  })

}


const actualizarImagen = async (req, res = response) => {

  const { coleccion, id } = req.params;
  let modelo;
  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(500).json({
          msg: `No existe el usuario con el id ${id}`
        });
      }
      break;
    case 'productos':
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(500).json({
          msg: `No existe el producto con el id ${id}`
        });
      }
      break;
    default:
      break;
  }

  // limpiar imagenes previas

  if( modelo.images ){
    // ha que borrar las iagenes previas del servidor local
    const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.images);
     if( fs.existsSync( pathImagen ) ) { // busca la iagen en la ruta  pathImagen
         fs.unlinkSync( pathImagen ); // elimina la imagen en la ruta  pathImagen
     }
  }

  const nombreImg = await subirArchivo(req.files, undefined, coleccion); 
  modelo.images = nombreImg,
    await modelo.save();

  res.json(modelo)
}


const actualizarImagenNube = async (req, res = response) => {

  const { coleccion, id } = req.params;
  let modelo;
  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(500).json({
          msg: `No existe el usuario con el id ${id}`
        });
      }
      break;
    case 'productos':
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(500).json({
          msg: `No existe el producto con el id ${id}`
        });
      }
      break;
    default:
      break;
  }

  // limpiar imagenes previas

  if( modelo.images ){
   // cortamos la ruta completa de la imagen para asi poder obtener el NombreId de la imagen
   const nombreImagen = modelo.images.split('/');
   const imagenId =  nombreImagen[nombreImagen.length-1];
   const [ public_id_Imagen ] = imagenId.split('.');
   console.log(public_id_Imagen);
   cloudinary.uploader.destroy( public_id_Imagen );
   
   
  }
  const { tempFilePath } = req.files.archivo;
  const { secure_url } = await cloudinary.uploader.upload( tempFilePath);
 

 // const nombreImg = await subirArchivo(req.files, undefined, coleccion); 
  modelo.images = secure_url,
    await modelo.save();

  res.json(modelo);
  
}


const  obtenerImagen = async (req, res = response ) => {
      const { coleccion, id } = req.params;
        const imagenDefault = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.call.org.pe%2Fincludes%2Fmantenimiento.php&psig=AOvVaw3mc8GozfzENd4Wt-gC4WcW&ust=1630351220698000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCIjJjeX51vICFQAAAAAdAAAAABAD';
      let picture;
      switch (coleccion) {
        case 'usuarios':
          picture = await Usuario.findById(id);
          if (!picture) {
            return res.status(500).json({
              msg: `No existe el usuario con el id ${id}`,
              rutaIagenAlternativa: `${imagenDefault}`
            
            });  
          }
          break;
        case 'productos':
          picture = await Producto.findById(id);
          if (!picture) {
            return res.status(500).json({
              msg: `No existe el usuario con el id ${id}`,
              rutaIagenAlternativa: `${imagenDefault}`
            });
          }
          break;
        default:
          break;
      }

    

      if( picture.images ){
        // ha que borrar las iagenes previas del servidor local
        const pathImagen = path.join( __dirname, '../uploads', coleccion, picture.images);
         if( fs.existsSync( pathImagen ) ) { // busca la iagen en la ruta  pathImagen
             return res.sendFile( pathImagen ); 
         }
      }else{
      
          const pathImagenDefault = path.join(__dirname, '../assets/no-image.jpg'); // designando ruta absulota para poder servir la imagen
          return res.sendFile(pathImagenDefault);// sendFile solo recibe rutas absolutas
        
      }
}


module.exports = {
  cargarArchivo,
  actualizarImagen,
  obtenerImagen,
  actualizarImagenNube
}