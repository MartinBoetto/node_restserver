const { response } = require('express');
const User = require("../models/user");
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/JWT-generate');

const loginPost = async (req, res = response)=>{
    //ejemplo si quiero mandaer un cod de status distinto del 200
    //res,status(403).json({})

    const body = req.body;
    const { mail, password} = req.body;
    try{

        //verificar usuario valido
        const user = await User.findOne({ mail });
        console.log( `El mail ${mail} no existe, ${user}`);
        if(!user){
            return res.status(400).json({
                msg:`El mail ${mail} no existe`
            });
        }
        //verificao q el status sea true
        if(!user.state){
            return res.status(400).json({
                msg:`El usuario se encuentra anulado`
            });
        }
        //Valido password
        const validPass = bcryptjs.compareSync(password, user.password)
        if(!validPass){
            return res.status(400).json({
                msg:`Contraseña incorrecta`
            });
        }

        //genero el jwt
        const token = await generateJWT(user._id, user.mail);

        res.json({
            ok:true,
            msg:"Post Login API by controller" ,   
            user,
            token
        });
    

    }catch(err){
        console.log(err);
        return res.status(500).json({
            msg:"Error de procesamiento"
        })
    }


}   

module.exports = {
    loginPost
}