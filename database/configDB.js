const mongoose = require('mongoose');


const dbConnection = async () => {

    try {

        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log(' ==>> BASE DE DATOS CONECTADA ');
      
    } catch (error) {
      console.log('Error en la BD codigo ==> ' + err);
      throw new Error(`Error al Levantar la Base de Datos ==>>>`);
      
    }

}


module.exports = {
  dbConnection
}