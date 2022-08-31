const { Router, response } = require('express');
const router = Router();

const { check } = require('express-validator');
const { validateField } = require('../middleware/validate-field');
const { validarJWT } = require('../middleware/validate-jwt');
const {createCategory, listAllCategories, listCategory, updateCategory, deleteCategory} = require ('../controllers/categories');
const { existCategoryId } = require('../helpers/db-validators');
const { isAdminRole } = require('../middleware/validate_role');




//Obtener todas las categorias -- Publico
router.get('/', 
    [
        validarJWT,
        validateField
    ],
    listAllCategories

);


 //Obtener una categoria por id -- Publico
router.get('/:id', 
    [
        validarJWT,
        check('id','No es un Id valido').isMongoId(),
        check('id').custom(existCategoryId),
        validateField
    ],   
    listCategory

) ;

  //Crear una categoria  -- Privado con cualquier token valido
router.post('/', 
    [
        validarJWT,
        check('name','El nombre esta vacio').not().isEmpty(),
        validateField
    ],
    createCategory
) ;

 //actualizar una categoria  -- Privado con cualquier token valido
router.put('/:id', 
    [
        validarJWT,
        isAdminRole,
        check('id').custom(existCategoryId),
        check('id','No es un Id valido').isMongoId(),
        check('name','El nombre esta vacio').not().isEmpty(),
        validateField
    ],
    updateCategory
 ) ;

  //borrar una categoria  -- Privado con solo con Rol Admin.. state = false
router.delete('/:id', 
    [
        validarJWT,
        isAdminRole,
        check('id').custom(existCategoryId),
        check('id','No es un Id valido').isMongoId(),
        validateField
    ],
deleteCategory

) ;

module.exports = router;