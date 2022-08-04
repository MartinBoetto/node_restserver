const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    name:{
        type: String,
        require:[true, 'El nombre de usuario es obligatorio']
    },
    mail:{
        type: String,
        require:[true, 'El mail es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        require:[true, 'La contraseña es obligatorio']
    },
    img:{
        type: String
    },
    role:{
        type: String,
        require: true
        //enum:['ADMIN_ROLE','USER_ROLE']
    },
    state:{
        type: Boolean,
        default:true
    },
    google:{
        type: Boolean,
        default:false
    },
    uid:{
        type:String,
        require :true
    }

});


//sobrescribo el metodo toJSON para sacar parametros q no quiero q viejen en la respuesta

UserSchema.methods.toJSON = function(){
    const {__v, password, _id, ...userinfo} = this.toObject();
    userinfo.uid = _id;
    return userinfo;
}



module.exports = model('User',UserSchema);