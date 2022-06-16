const { response } = require('express');



const usuariosGet = (req, res = response)=>{
    //ejemplo si quiero mandaer un cod de status distinto del 200
    //res,status(403).json({})

    //obtengo los parametros q viene en el querystring de la URL
    const query = req.query;  //asi obtengo todo el querystring
    const { usuario, apikey } = req.query; //asi desestructuro el querystring y obtengo lo q quiero

    res.json({
        ok:true,
        msg:"Get API by Controller",
        usuario,
        apikey
    });
};

const usuariosPut =(req, res = response)=>{
    //ejemplo si quiero mandaer un cod de status distinto del 200
    //res,status(403).json({})

    //obtengo el id q viene en la URL /api/usuarios/10
    const id = req.params.id;
    res.json({
        ok:true,
        msg:"Put API by controller",
        id
    });
};

const usuariosPost = (req, res = response)=>{
    //ejemplo si quiero mandaer un cod de status distinto del 200
    //res,status(403).json({})
    const {nombre, edad} = req.body;
    
    res.json({
        ok:true,
        msg:"Post API by controller",
        nombre,
        edad
    });
}

const usuariosDelete = (req, res = response)=>{
    //ejemplo si quiero mandaer un cod de status distinto del 200
    //res,status(403).json({})

    //obtengo el id q viene en la URL /api/usuarios/10
    const id = req.params.id;
    res.json({
        ok:true,
        msg:"Delete API by controller"
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}