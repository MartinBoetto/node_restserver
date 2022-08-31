const { Router, response } = require('express');
const router = Router();

const { check } = require('express-validator');
const { validateField } = require('../middleware/validate-field');
const { validarJWT } = require('../middleware/validate-jwt');
const {listProduct,listAllProducts,updateProduct,createProduct,deleteProduct} = require ('../controllers/products');
const { existCategoryId, existProductId } = require('../helpers/db-validators');
const { isAdminRole } = require('../middleware/validate_role');




//Obtener todas las categorias -- Publico
router.get('/', 
    [
        validarJWT,
        validateField
    ],
    listAllProducts
);


 //Obtener una categoria por id -- Publico
router.get('/:id', 
    [
        validarJWT,
        check('id','No es un Id valido').isMongoId(),
        check('id').custom(existProductId),
        validateField
    ],   
    listProduct

) ;

  //Crear una producto  -- Privado con cualquier token valido
router.post('/', 
    [
        validarJWT,
        check('name','El nombre esta vacio').not().isEmpty(),
        check('category','Categoria esta vacio').not().isEmpty(),
        check('description','Descripcion esta vacio').not().isEmpty(),
        validateField
    ],
    createProduct
) ;

 //actualizar una categoria  -- Privado con cualquier token valido
router.put('/:id', 
    [
        validarJWT,
        isAdminRole,
        check('id').custom(existProductId),
        check('id','No es un Id valido').isMongoId(),
        //check('name','El nombre esta vacio').not().isEmpty(),
        //check('category','Categoria esta vacio').not().isEmpty(),
        //check('description','Descripcion esta vacio').not().isEmpty(),
        validateField
    ],
    updateProduct
 ) ;

  //borrar una categoria  -- Privado con solo con Rol Admin.. state = false
router.delete('/:id', 
    [
        validarJWT,
        isAdminRole,
        check('id').custom(existProductId),
        check('id','No es un Id valido').isMongoId(),
        validateField
    ],
deleteProduct

) ;

module.exports = router;