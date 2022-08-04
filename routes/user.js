const { Router } = require('express');
const router = Router();

const { check } = require('express-validator');

const { usuariosGet, usuariosPut , usuariosPost, usuariosDelete} = require('../controllers/users');
const { isValidRol, existEmail, existId } = require('../helpers/db-validators');

const {validateField} =  require('../middleware/validate-field');
const { validarJWT } = require('../middleware/validate-jwt');
const { isAdminRole } = require('../middleware/validate_role');




router.get('/', usuariosGet) ;

router.put('/:id',
    [
        check('id','No es un Id valido').isMongoId(),
        check('id').custom(existId),
        validateField
    ],
usuariosPut) ;

router.post('/', 
    [  //middleware express-validator para validar los campos de entrada
        check('name','El nombre esta vacio').not().isEmpty(),
        check('mail','El el formato de correo es invalido').isEmail(), 
        check('mail').custom(existEmail),
        check('password', 'La password esta vacia o menor a 6 caracteres').not().isEmpty().isLength({min:6}),
        check('img', 'La imagen esta vacia').not().isEmpty(),
        //check('rol', 'El cod de rol es invalido').isIn(['ADMIN_ROLE','USER_ROLE']),
        check('role').custom(isValidRol),
        validateField
    ]
    ,usuariosPost) ;

router.delete('/:id',
    [
        validarJWT,
        isAdminRole,
        check('id','No es un Id valido').isMongoId(),
        check('id').custom(existId),
        validateField
    ],
usuariosDelete);



module.exports = router;

