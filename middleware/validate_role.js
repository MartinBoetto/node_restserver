const { response, request } = require("express");

const isAdminRole = (req = request, res = response, next)=>{

    const userLogued = req.userLogued;
    if(userLogued.role!='ADMIN_ROLE'){
        return res.status(401).json({
                msg:"Usuario sin permisos para realizar la operacion"
            })
    }

    next();

};


module.exports = {
    isAdminRole
};