const { parse } = require('dotenv');
const { response, request} = require('express');
const { Categoria } = require('../models')

const crearCategoria = async (req, res = response) =>{

  const nameCatego = req.body.nameCatego.toUpperCase();

  const categoriaDB = await Categoria.findOne({ nameCatego });
  if(categoriaDB) {
    res.status(401).json({
      msg: 'La categoria ya existe'
    })
  }
// generamos la data a guardar
  
  const data = { 
    nameCatego: nameCatego.toUpperCase(),
    usuario: req.usuario._id
  }
  console.log(`categoria =>> ${data.nameCatego}`)

  const categoria = new Categoria( data );
  // guardamos en la BD
  await categoria.save()

  res.status(201).json({
    msg: `Se creo la categoria ${data.nameCatego} con exito `,
    categoria
  })
 }

 const listarCategorias = async (req, res= response) =>{
  const  { limite, desde =0, pagina=1 } = req.query;
  const query = {estado: true };

      const [ totalCategorias, categorias ] = await Promise.all([
            Categoria.countDocuments(query),
            Categoria.find(query).populate('usuario', 'name')
                    .skip( Number( desde))
                    .limit( Number( limite ) )
          ]);
          res.json({
            totalCategorias,
            categorias
          })

    }

    const obtenerCategoria = async (req, res = response)=>{

      const { id } = req.params;
      console.log(req.body.usuario);
                                        
                     
       const categoriaId = await Categoria.findById(id).populate('usuario', 'email')
              res.status(200).json({
               categoriaId,
              
              })                           
    }

    const categoriaUpdate = async (req, res = response) =>{
      const { id } = req.params; // capturaoms el id del los parametros
      const { estado, usuario, ...data } = req.body; // creamos una copia del body ecptuando el estado y el usuario

      data.nameCatego = data.nameCatego.toUpperCase();
      data.usuario = req.usuario._id;
      const categoria = await Categoria.findByIdAndUpdate(id, data, {new: true});// {new: true} es para que se visualise los cambos ala primera
      res.json(categoria);
    }
  
    const DeleteCategoria = async (req, res = response) =>{
        const { id } = req.params;

        

        const delCategoria = await Categoria.findByIdAndUpdate( id, {estado: false}, {new:true} );  
      
        if(delCategoria){
          res.status(200).json({
            msg: 'Categoria Eliminada',
            delCategoria
           // usuarioUatenticado
           
          });
        }else{
          return res.status(404).json({
            msg: 'No se pudo eliminar la categoria'
          })
        }
       
          

    } 
    

 

 module.exports = {
   crearCategoria,
   listarCategorias,
   obtenerCategoria,
   categoriaUpdate,
   DeleteCategoria
 }