const express = require('express');
const cors = require('cors');
const { dbConnection  } = require('../database/configDB')

class Server {
    constructor(){
      this.app = express();
      this.port = process.env.PORT;

      //RUTAS
      this.authRoutes=require('../routes/authRouter');
      this.userRoutes = require('../routes/usersRouter');
      
      this.authPath = '/API/auth';
      this.usersPath = '/API/users';
     

      // conectar db
      this.conectarDB();

      // Middlewares
      this.middlewares();

      // Rutas de mi aplicacion
      this.routes();

     
    }
    // CONECTAR BD

  async  conectarDB(){
      await dbConnection();
  }

    // MIDLEWARE

    middlewares(){
      //CORS
      this.app.use( cors());
      
      // Lectura y parseo de de body
      this.app.use( express.json() );

      // acceso directorio publico
      this.app.use( express.static('public') );
    }

    routes(){
      this.app.use(this.authPath, this.authRoutes)
      this.app.use(this.usersPath, this.userRoutes);
    }
    listen(){
      this.app.listen(this.port, () => {
        console.log('Servidor corriendo en el puerto ', this.port);
      })
    }
}

module.exports = Server;