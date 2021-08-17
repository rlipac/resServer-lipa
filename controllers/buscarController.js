const { response, request } = require('express');
const {Usuario, Categoria, Producto} = require('../models')

const { ObjectId } = require('mongoose').Types;
const coleccionesPermitidas = [
    'productos',
    'categorias',
    'usuarios',
    'roles'
]
const buscarUsuarios = async (termino='', res= response) => {
    const esMongoId =ObjectId.isValid( termino );// true

    if( esMongoId ) {
        const usuario = await Usuario.findById(termino);
       return  res.json({
            results : ( usuario ) ? [usuario] : []
        })
    }
    const regex = new RegExp( termino, 'i');
    
    // const usuarios = await Usuario.find({ name: regex});// para busacar pornombres
     const usuarios = await Usuario.find({
         $or:  [{ name: regex }, { email: regex }  ],
         $and: [ { estado: true }]
     })
     const totalUsuarios = await Usuario.count({
        $or:  [{ name: regex }, { email: regex }  ],
        $and: [ { estado: true }]
    })
    res.json({  
        results: { totalUsuarios, usuarios }
    })
}

const buscarProductos = async(termino='', res=response) => {
    const esMongoId =ObjectId.isValid( termino );// true

    if( esMongoId ) {
        const producto = await Producto.findById(termino).populate('usuario', 'email').populate('categoria', 'nameCatego');
       return  res.json({
            results : ( producto ) ? [producto] : []
        })
    }
    const regex2 = new RegExp( termino, 'i');
    
  
     const productos = await Producto.find({ 
        $or:  [{ nameProducto: regex2 } ],
        $and: [ { estado: true }]
     }).populate('usuario', 'email').populate('categoria', 'nameCatego');
   res.json({
       results: productos
   })
}

const buscarCategoria = async( termino='', res=response)=>{
     const esMongoId =ObjectId.isValid( termino );// true
     if( esMongoId ){
         const categoria = await Categoria.findById(termino).populate('usuario', 'email');
         return res.json({
             results: ( categoria ) ? [ categoria ] : []
         })
     }
     const categoRegex = new RegExp( termino, 'i');

     const categorias = await Categoria.find({ 
         $or: [ { nameCatego: categoRegex }],
         $and: [ { estado : true }]
      }).populate('usuario', 'email');
      res.json({
          results: categorias
      })
}


const buscar = (req= request, res= response ) => {
 
    const { coleccion, termino} = req.params;

    if( !coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las coleciones permitidas son : ${coleccionesPermitidas}`
        })
    }

    switch(coleccion){
        case 'usuarios':
            buscarUsuarios(termino, res)
            break;
        case 'categorias':
            buscarCategoria(termino, res)
            break;
        
        
        case  'productos':
            buscarProductos(termino, res)
          
            break;
        default:
            res.status(500).json({
                msg: 'Se le olvido hacer esta busqueda'
            })
    }
}


module.exports = {
    buscar
}