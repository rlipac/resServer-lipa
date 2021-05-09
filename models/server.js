const express = require('express');
const cors = require('cors');

class Server {
    constructor(){
      this.app = express();
      this.port = process.env.PORT;
      this.userRoutes = require('../routes/usersRouter')
      this.usersPath = '/API/users';

      // Middlewares
      this.middlewares();

      // Rutas de mi aplicacion
      this.routes();

     
    }
    middlewares(){
      //CORS
      this.app.use( cors());
      
      // Lectura y parseo de de body
      this.app.use( express.json() );

      // acceso directorio publico
      this.app.use( express.static('public') );
    }

    routes(){
      this.app.use(this.usersPath, this.userRoutes);
    }
    listen(){
      this.app.listen(this.port, () => {
        console.log('Servidor corriendo en el puerto ', this.port);
      })
    }
}

module.exports = Server;