const { Router } = require('express');
const router = Router();

const { check } = require('express-validator');
const { loginPost ,googleSignIn} = require('../controllers/auth');
const { validateField } = require('../middleware/validate-field');


router.post('/login', 
    
    check('mail', "El correo es obligatorio").isEmail(),
    check('password', 'La password esta vacia o menor a 6 caracteres').not().isEmpty().isLength({min:6}),
    validateField

,loginPost) ;


router.post('/google', 
    
    check('id_token', "El id_token es necesario").not().isEmpty(),
    validateField

,googleSignIn) ;


module.exports = router;