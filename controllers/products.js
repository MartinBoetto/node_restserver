const { response } = require('express');
const Product = require("../models/product");
const Category = require("../models/category");

const bcryptjs = require('bcryptjs');

//Controller para crear una Categoría
const createProduct = async(req, res = response)=>{
    
    const {name, state,price, category,description,dispose} = req.body;
    
    const categoryUpper = category.toUpperCase();
    console.log("categoryUpper", categoryUpper);

    //valido que el producto ya  exista
    const existProduct = await Product.findOne({name});
    if(existProduct){
        return res.status(401).json({
            msg: 'Producto existente no existente'
        })
    };
    //valido q exista la categoría
    const existCategory = await Category.findOne({name:categoryUpper});
    if(!existCategory){
        return res.status(401).json({
            msg: 'Categoría seleccionada no existente'
        })
    };

        
    const data = {
        name, state,price, 
        category:existCategory,
        description,dispose,
        user: req.userLogued._id
    }

    const product = new Product(data);
    await product.save();
   
    res.status(201).json({
        ok:true,
        msg:"Crear producto API by controller",
        product
    })
 
};

//Controller para obtener una lista de categorias, paginado y con total de registros, populate
const listAllProducts = async(req, res = response)=>{
    
    //obtengo los parametros q viene en el querystring de la URL
    const query = req.query;  //asi obtengo todo el querystring
    const { limit, page = 0 } = req.query; //asi desestructuro el querystring y obtengo lo q quiero

    //haciendo con promise, puedo hacer las 2 ejecuciones en paralelo
    const [products, total] = await Promise.all([
        Product.find({ state : true})
            .limit(Number(limit))
            .skip(Number(page))
            .populate({  //populo el user y solamente muestro name, mail y saco el _id
                path: 'user',
                select: 'name mail -_id'
              })
            .populate({  //populo el user y solamente muestro name, mail y saco el _id
                path: 'category',
                select: 'name'
              })
            ,
        Product.countDocuments({ state : true})

    ]);

    res.json({
        products,
        total
    })
};

//controller para obtener una producto puntual, populate
const listProduct = async(req, res = response)=>{
    
    //obtengo el id q viene en la URL /api/usuarios/10
    const { id }= req.params;
    console.log("id:", id);

    //con esto ejecuto como una query con el where q necesito
    const product = await Product.find({_id:id, state:true})
    .populate({  //populo el user y solamente muestro name, mail y saco el _id
        path: 'user',
        select: 'name mail -_id'
      })
    .populate({  //populo el user y solamente muestro name, mail y saco el _id
        path: 'category',
        select: 'name'
      })
    
     res.json({
        product
    });
    

};

//controller para actualizar una categoría puntual
const updateProduct = async(req, res = response)=>{
    
    const { id }= req.params;
    const { name, price, category, description,dispose} = req.body;

    
    //busco el producto por id
    const product = await Product.findById(id);

   
    if(name){ product.name=name };
    if(price){ product.price=name };
    if(category){ 
        console.log("category: ",category);
        //valido q exista la categoría
        const categoryUpper = category.toUpperCase();
        const existCategory = await Category.findOne({name:categoryUpper});
        if(!existCategory){
            return res.status(401).json({
                msg: 'Categoría seleccionada no existente'
            })
        };
        product.category=existCategory;
    }
    if(description){product.description = description;}
    if(dispose){ product.dispose = dispose;}  
    
       
    product.save();
    
    res.json({
        ok:true,
        msg:"Actualizar una categoria API by controller",
        product
    })
    
};

//controller para borrar una categoría puntual, status en false
const deleteProduct = async(req, res = response)=>{
   
    const { id }= req.params;
   
    //busco la producto por id
    //borrar logicamente un registro
    const {name} = await Product.findByIdAndUpdate(id,{state : false} );
    
    res.json({
        ok:true,
        msg:"Borrar producto API by controller",
        name
        
    })

};

module.exports = {
    createProduct,
    listAllProducts,
    listProduct,
    updateProduct,
    deleteProduct
};
