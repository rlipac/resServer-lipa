const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection  } = require('../database/configDB')

class Server {
    constructor(){
      this.app = express();
      this.port = process.env.PORT;

      //RUTAS
      this.authRoutes= require('../routes/authRouter');
      this.buscarRoutes= require('../routes/buscarRouter');
      this.categoriasRoutes = require('../routes/categoriasRouter');
      this.productosRoutes = require('../routes/productoRouter');
      this.userRoutes = require('../routes/usersRouter');
      this.uploadsRouter = require('../routes/uploadsRouter');
      

      this.rutas = {
        auth:  '/API/auth',
        buscar: '/API/buscar', 
        categorias:  '/API/categorias',
        productos:  '/API/productos',
        users:  '/API/users',
        uploads:  '/API/uploads'
      }
     
     

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

      // subir archivos 

      this.app.use(fileUpload({
        useTempFiles : true,
        tempFileDir : '/tmp/',
        createParentPath: true
    }));
    }

    routes(){
      this.app.use(this.rutas.auth, this.authRoutes);
      this.app.use(this.rutas.buscar, this.buscarRoutes);
      this.app.use(this.rutas.categorias, this.categoriasRoutes);
      this.app.use(this.rutas.productos, this.productosRoutes);
      this.app.use(this.rutas.users, this.userRoutes);
      this.app.use(this.rutas.uploads, this.uploadsRouter);
    }
    listen(){
      this.app.listen(this.port, () => {
        console.log('Servidor corriendo en el puerto ', this.port);
      })
    }
}

module.exports = Server;