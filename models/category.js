const {Schema, model} = require('mongoose');

const CategorySchema = Schema({

    name:{
        type: String,
        require:[true, 'El nombre es obligatorio'],
    },
    state:{
        type: Boolean,
        default:true,
        require:true
    },
    user:{ //defino un usuario del tipo del modelo User q ya manejo en la BD Mongo
        type: Schema.Types.ObjectId,
        ref:'User',
        require:true
    }


    })

    CategorySchema.methods.toJSON = function(){
        const {__v, ...categoryinfo} = this.toObject();
        return categoryinfo;
    }

module.exports= model('Category',CategorySchema);
