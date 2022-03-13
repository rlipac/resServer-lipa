const { response, request } = require('express');
const { parse } = require("dotenv");
const { body } = require("express-validator");
const nodemon = require("nodemon");
//Modelos
const { Producto } = require("../models");
const { Categoria } = require("../models");



const crearProducto = async (req, res = response) => {
 
  
    const { nameProducto, categoria, id_usuario, precio, estado, images, descripcion} = req.body;
    const catego = categoria.toUpperCase();
    const producto = nameProducto.toUpperCase();
    console.log('==>  ', catego)
  

    const categoriaDB = await Categoria.find({ nameCatego: catego });
    if (!categoriaDB || categoriaDB =="") {
      return res.status(404).json({
        msg: ` La categoria ${categoria} no existe`
      });
     
    }
    console.log('mi categoria ==> ', categoriaDB)
    const nombreCategoria = categoriaDB.map(function(cate) {
      return cate._id;
  });
   
  console.log(nombreCategoria);
   
    const productoDB = await Producto.findOne({
      nameProducto: producto
    });
    if (productoDB) {
      res.status(401).json({
        msg: `El producto  ${nameProducto}  ya EXISTE`,
      });
    }


     const data = {
      categoria: nombreCategoria,
      nameProducto: nameProducto.toUpperCase(),
      usuario: id_usuario,
      images:images
      
    };
     console.log(data);
    const nuevoProducto = new Producto(data);
    await nuevoProducto.save();
    res.status(201).json({
    msg: `El producto ${data.nameProducto} se creo con exito... :)`,
      nuevoProducto,
    });
 
 };

const listarProductos = async (req, res = response) => {
  const { limite=0 , desde = 0, pagina = 1 } = req.query;
  const query = { estado: true };

  const [totalProductos, productos] = await Promise.all([
    Producto.countDocuments(query),
    Producto.find(query)
      .populate("usuario", "email" )
      .populate("categoria", "nameCatego")
      .skip(Number(desde))
      .limit(Number(limite)),
  ]);
  res.json({
    totalProductos,
    productos
  });
};

    const obtenerProducto = async (req, res = response)=>{

      const { id } = req.params;

      console.log(req.params);
        // comentarios
       const productoID = await Producto.findById(id).populate('categoria', 'nameCatego').populate('usuario', 'email');
              res.status(200).json({
               productoID,

              })
    }
  
    const updateProducto = async(req, res = response) => {
      const { id } = req.params;

      const { estado, usuario, ...data} = req.body;
      console.log( id);
      
      data.nameProducto= data.nameProducto.toUpperCase();
      data.usuario = req.usuario._id;
   
   
      const productoUpdate = await Producto.findByIdAndUpdate(id, data, {new: true})
      .populate("categoria", "nameCatego")
      res.status(200).json({
        productoUpdate
       
      })
      

 
    }



    const DeleteProducto = async (req, res = response) =>{
        const { id } = req.params;

        const delProducto = await Producto.findByIdAndUpdate( id, {estado: false}, {new:true} );

        if(delProducto){
          res.status(200).json({
            msg: 'Producto Eliminada',
            delProducto
           // usuarioUatenticado

          });
        }else{
          return res.status(404).json({
            msg: 'No se pudo eliminar la categoria'
          })
        }

    }

module.exports = {
  crearProducto,
  listarProductos,
  obtenerProducto,
  updateProducto,
  DeleteProducto
};
