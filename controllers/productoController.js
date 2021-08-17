const { parse } = require("dotenv");
const { response, request } = require("express");
const { body } = require("express-validator");
const { Producto } = require("../models");
const { Categoria } = require("../models");



const crearProducto = async (req, res = response) => {
  
    const { estado, usuario,  ...body } = req.body;
    const catego = body.nameCatego.toUpperCase();
    console.log(catego + " 1");

    const categoriaDB = await Categoria.findOne({ nameCatego: catego });
    if (!categoriaDB) {
      return res.status(404).json({
        msg: ` La categoria ${body.nameCatego} no existe`
      });
     
    }
    console.log(categoriaDB + " 2 ");

    const productoDB = await Producto.findOne({
      nameProducto: body.nameProducto,
    });
    if (productoDB) {
      res.status(401).json({
        msg: " El producto ya EXISTE",
      });
    }

//     console.log(req.usuario + " <<==");

     const data = {
      ...body,
      categoria:categoriaDB._id,
      nameProducto: body.nameProducto.toUpperCase(),
      usuario: req.usuario.id,
    };
    const nuevoProducto = new Producto(data);
    await nuevoProducto.save();
    res.status(201).json({
    msg: `El producto ${data.nameProducto} se creo con exito... :)`,
      nuevoProducto,
    });
 
 };

const listarProductos = async (req, res = response) => {
  const { limite=5 , desde = 0, pagina = 1 } = req.query;
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
