const { genSalt, hash } = require('bcrypt');
const {Schema,model} = require('mongoose');

const user_esquema = new Schema({
    usuario:{
        type: "string",
        required: true
    },
    correo:{
        type: "string",
        unique:true,
        required:true,
        max:100
    },
    contrasena:{
        type: "string",
        required:true
    },
    rol:{
        type: "string",
        required:true
    }
});

user_esquema.pre("/guardar_use", function(next) {
    const salt = genSalt(10);
    console.log(salt);
    this.contrasena= hash(this.contrasena, salt);
    next();
});

const user_model = model("usuarios",user_esquema);
exports.user_model=user_model;
