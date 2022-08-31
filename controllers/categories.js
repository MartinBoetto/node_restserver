const { response } = require('express');
const Category = require("../models/category");

const bcryptjs = require('bcryptjs');

//Controller para crear una Categoría
const createCategory = async(req, res = response)=>{
    const body = req.body;
    const name = body.name.toUpperCase();
    //valido q ya no exista la categoria a crear
    const existCategory = await Category.findOne({name});
    console.log("Categoria",existCategory);

    if(existCategory){
        return res.status(401).json({
            msg: 'Categoría existente'
        })
    }

    const data = {
        name,
        user: req.userLogued._id
    }

    const category = new Category(data);
    await category.save();
    console.log('category', data);

    res.status(201).json({
        ok:true,
        msg:"Crear categoria API by controller",
        category
    })

};

//Controller para obtener una lista de categorias, paginado y con total de registros, populate
const listAllCategories = async(req, res = response)=>{
    
    //obtengo los parametros q viene en el querystring de la URL
    const query = req.query;  //asi obtengo todo el querystring
    const { limit, page = 0 } = req.query; //asi desestructuro el querystring y obtengo lo q quiero

    //haciendo con promise, puedo hacer las 2 ejecuciones en paralelo
    const [categories, total] = await Promise.all([
        Category.find({ state : true})
            .limit(Number(limit))
            .skip(Number(page))
            .populate({  //populo el user y solamente muestro name, mail y saco el _id
                path: 'user',
                select: 'name mail -_id'
              })
            ,
        Category.countDocuments({ state : true})

    ]);

    res.json({
        categories,
        total
    })
};

//controller para obtener una categoría puntual, populate
const listCategory = async(req, res = response)=>{
    //obtengo el id q viene en la URL /api/usuarios/10
    const { id }= req.params;
    console.log("id:", id);

    //con esto ejecuto como una query con el where q necesito
    const category = await Category.find({_id:id, state:true})
    .populate({  //populo el user y solamente muestro name, mail y saco el _id
        path: 'user',
        select: 'name mail -_id'
      });
    
      //con esto busco por id directamente
      /*
    const category = await Category.findById(id)
    .populate({  //populo el user y solamente muestro name, mail y saco el _id
        path: 'user',
        select: 'name mail -_id'
      });
    */
    res.json({
        category
    });

};

//controller para actualizar una categoría puntual
const updateCategory = async(req, res = response)=>{
    const { id }= req.params;
    const newName =  req.body.name.toUpperCase();

    //busco la categoría por id
    const category = await Category.findById(id);
    category.name= newName;
    category.save();
    
    res.json({
        ok:true,
        msg:"Actualizar una categoria API by controller",
        category
    })

};

//controller para borrar una categoría puntual, status en false
const deleteCategory = async(req, res = response)=>{
    const { id }= req.params;
   
    //busco la categoría por id
    //borrar logicamente un registro
    const {name} = await Category.findByIdAndUpdate(id,{state : false} );
    
    res.json({
        ok:true,
        msg:"Borrar categoria API by controller",
        name
        
    })
};

module.exports = {
    createCategory,
    listAllCategories,
    listCategory,
    updateCategory,
    deleteCategory
}
