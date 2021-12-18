const {compare} = require("bcrypt")
const { Router } = require("express");
const user_rutas = Router();
const {user_model} = require("../modelos/user_model")
const {sign} = require("jsonwebtoken")
const {guardian} = require("../guardian/guardian")

user_rutas.post("/login", async function(req,res){
    try {
        const {correo,contrasena} = req.body;
        const usuario = await user_model.findOne({correo});
        console.log(usuario);
        if (!usuario){
            return res.status(401).send({estado:"Error",msg:"Credenciales no válidas"})
        }
        const passok = await compare(contrasena,usuario.contrasena);
        console.log("--------------------------------------------------------"),
        console.log(passok);
        if(passok){
            const token = sign({correo:usuario.correo, rol:usuario.rol},process.env.JWT_SECRET_KEY)
            return res.status(200).send({estado:"OK",msg:"Logueado",token})
        }
        else{ 
            return res.status(401).send({estado:"Error",msg:"Credenciales no validas"})
        }
    } catch (error) {
        
    }
});

user_rutas.post("/guardar_user", guardian, async function(req,res){
    const datos = req.body;
    const usuario = new user_model(datos);
    usuario.save(function(error){
        if (error){
            return res.status(500).send({estado:"Error",msg:"Usuario no guardado"})
        }
        return res.status(200).send({estado:"OK",msg:"Guardado"})
    })
})

exports.user_rutas = user_rutas;