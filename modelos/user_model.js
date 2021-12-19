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

user_esquema.pre("save", async function(next) {
    const salt = await genSalt(10);
    this.contrasena= await hash(this.contrasena, salt);
    next();
});

const user_model = model("usuarios",user_esquema);
exports.user_model=user_model;
