const mongoose = require('mongoose');


const dbConnection = async () => {

    try {

        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log(' ==>> BASE DE DATOS CONECTADA '.blue.bgBrightWhite);
      
    } catch (error) {
      console.log(`\n Error en la BD codigo ==>  ${error}`.red);
      throw new Error(`Error al Levantar la Base de Datos ==>>>\n`.red );
      
    }

}


module.exports = {
  dbConnection
}