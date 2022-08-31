const {Schema, model} = require('mongoose');

const ProductSchema = Schema({

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
    },
    price:{
        type:Number,
        default:0
    },
    category:{
        type: Schema.Types.ObjectId,
        ref:'Category',
        require:true
    },
    description:{type:String},
    dispose:{type:Boolean, default:true}
});


ProductSchema.methods.toJSON = function(){
    const {__v, ...productinfo} = this.toObject();
    return productinfo;
}


module.exports= model('Product',ProductSchema);
