const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
      nameCatego:{
        type: String,
        required: [ true, 'El nombre de la es obligatorio'],
        unique: true
      },
      estado:{
        type:Boolean,
        default:true,
        required:true
      },
      usuario:{
        type:Schema.Types.ObjectId,
        ref: 'Usuario',
        default:true
      }
});

CategoriaSchema.methods.toJSON = function(){
 
  const {__v, estado, _id, ...data} = this.toObject();
   
  return  data;
}

module.exports = model( 'Categoria', CategoriaSchema );