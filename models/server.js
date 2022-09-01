const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config.js');
const fileUpload = require('express-fileupload');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT
        this.usuariosPath= '/api/usuarios';
        this.authPath='/api/auth';
        this.categoriasPath = '/api/categorias';
        this.productosPath = '/api/productos';
        this.uploadFilesPath = '/api/uploads/files'

        //Middleware
        this.middleware();

        //rutas de mi app
        this.routes();

        //Conectar a la BD
        this.connectDB();
    
    }

    async connectDB(){
      await dbConnection();
    }

    middleware(){
        
        this.app.use( cors());
        //Directorio publico
        this.app.use( express.static('public'));
        //Lectura y Parse del body
        this.app.use(express.json());

        //Fileupload
        this.app.use( fileUpload ({
            useTempFiles:true,
            tempFileDir:'/tmp/',
            createParentPath:true //este parametro en true permite q si la carpeta no existe, la crea automaticamente
        }));

    }


    routes(){
        //armo la ruta para api/usuarios q apute al user.js
        this.app.use(this.authPath, require('../routes/auth.js'));
        this.app.use(this.usuariosPath, require('../routes/user.js'));
        this.app.use(this.categoriasPath, require('../routes/categories.js'));
        this.app.use(this.productosPath, require('../routes/products.js'))
        this.app.use(this.uploadFilesPath, require('../routes/uploads.js'))
        
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Aplicacion corriendo en puerto:' + this.port);
        });
    }

};

module.exports=Server;