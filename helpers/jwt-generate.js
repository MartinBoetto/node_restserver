const jwt = require('jsonwebtoken');
const generateJWT = (uid, mail)=> {

    return new Promise((resolve, reject) =>{

        const payLoad = { uid, mail};
        jwt.sign(payLoad, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) =>{
            if(err){
                console.log(err);
                reject( "NO se pudo generar el JWT");
            }else{
                resolve(token);
            }
        })

    })

}

module.exports = {
    generateJWT
}