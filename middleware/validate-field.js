const { validationResult } = require('express-validator');


//defino un middleware, siempre tengo q definir la funcion next para decirle si se ejecuto
// ok haga el next
const validateField = (req, res, next)=>{

    //obtengo los errores q capturo en el user.js del router
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    };

    next();

}

module.exports = {
    validateField
}