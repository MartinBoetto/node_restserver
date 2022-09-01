const { Router } = require('express');
const router = Router();

const { check } = require('express-validator');
const { uploadFiles } = require('../controllers/uploads');
const { validateField } = require('../middleware/validate-field');

router.post('/', [
    
    //check('mail', "El correo es obligatorio").isEmail(),
    //check('password', 'La password esta vacia o menor a 6 caracteres').not().isEmpty().isLength({min:6}),
    //validateField
    ],
uploadFiles) ;




module.exports = router;