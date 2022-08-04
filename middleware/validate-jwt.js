const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require("../models/user");


//los middlewarer siemrpe tienen 3 argumentos, req, res y next
const validarJWT = async (req =  request, res=response, next)=>{

    const token = req.header('Authorization');
    console.log(`Token: ${token}`);

    if(!token){
        return res.status(401).json({
            msg:"Token no enviado"
        })
    }
    try{

        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const userLogued = await User.findById(uid);
        if(!userLogued){
            return res.status(401).json({
                msg:"Usuario no valido"
            })
        };
        if(!userLogued.state){
            return res.status(401).json({
                msg:"Usuario con estado invalido"
            })
        };
        req.uid = uid;
        req.userLogued = userLogued;
        next();
    }
    catch(err){
        console.log(err);
        return res.status(401).json({
            msg:"Token invalido"
        });
    }
}

module.exports={
    validarJWT
}