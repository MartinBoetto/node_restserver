const { response } = require('express');
const User = require("../models/user");

const bcryptjs = require('bcryptjs');
const { existEmail } = require('../helpers/db-validators');



const usuariosGet = async(req, res = response)=>{
    //ejemplo si quiero mandaer un cod de status distinto del 200
    //res,status(403).json({})

    //obtengo los parametros q viene en el querystring de la URL
    const query = req.query;  //asi obtengo todo el querystring
    const { usuario, apikey, limit, page = 0 } = req.query; //asi desestructuro el querystring y obtengo lo q quiero

    /*res.json({
        ok:true,
        msg:"Get API by Controller",
        usuario,
        apikey
    });*/
    /* de esta forma no es performante, pq ejecuta el primero y luego el segundo query a la BD
    const users = await User.find({ state : true})
    .limit(Number(limit))
    .skip(Number(page));
    const total = await User.countDocuments({ state : true});
   */

    //haciendo con promise, puedo hacer las 2 ejecuciones en paralelo
    const [users, total] = await Promise.all([
        User.find({ state : true})
            .limit(Number(limit))
            .skip(Number(page)),
        User.countDocuments({ state : true})

    ]);

    res.json({
        users,
        total
    });
};

const usuariosPut =async (req, res = response)=>{
     //obtengo el id q viene en la URL /api/usuarios/10
    const id = req.params.id;
    console.log(`Id: ${id}` );
    //desestructuro los datos q vienen en el body
    const {_id, password, google,  ...resto} = req.body;
    //validar contra la BD

    if(password) {
        //hasheo la password
        const salt =  bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt);
    }

    const user = await User.findByIdAndUpdate(id, resto);

    res.json({
        msg:"Put API by controller",
        user
    });
};

const usuariosPost = async (req, res = response)=>{
    //ejemplo si quiero mandaer un cod de status distinto del 200
    //res,status(403).json({})

    const body = req.body;
    const user = new User( body);
    
    //hasheo la password
    const salt =  bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(body.password, salt);
    
    await user.save();
    
    //const {nombre, edad} = req.body;
    
    res.json({
        ok:true,
        msg:"Post API by controller",
        user
    });
}

const usuariosDelete = async (req, res = response)=>{
    //ejemplo si quiero mandaer un cod de status distinto del 200
    //res,status(403).json({})

    //obtengo el id q viene en la URL /api/usuarios/10
    const id = req.params.id;
    //borra fisicamente
    //const user = await User.findByIdAndDelete( id );

    //borrar logicamente un registro
    const user = await User.findByIdAndUpdate( id, {state : false} );
    res.json({
        ok:true,
        msg:"Delete API by controller",
        user
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}