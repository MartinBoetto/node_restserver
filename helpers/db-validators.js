const Role = require('../models/role');
const User = require("../models/user");


const isValidRol = async (role = '') =>{
    console.log(`Rol: ${role}`);
    const existRol = await Role.findOne({ role });
    console.log(`ExisteRol: ${existRol}`);
    if(!existRol){
        throw new Error(`El rol ${rol} no existe`);
    }
}


const existEmail = async (mail = '') =>{

    const existEmail = await User.findOne({ mail });
    console.log( `El mail ${mail} ya existe`);
    if(existEmail){
        throw new Error(`El mail ${mail} ya existe existe`);
    }
}

const existId = async (id) =>{

    console.log('entro');
    const existId= await User.findById(id);

    console.log( `El id ${id} no existe`);
    if(!existId){
        throw new Error(`El id  no existe existe`);
    }
}

module.exports={
    isValidRol,
    existEmail,
    existId
}