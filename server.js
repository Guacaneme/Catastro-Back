"use Strict";
const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();

const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const {user_rutas} = require("./rutas/user_rutas");
app.use("/user",user_rutas);


app.get("/", function(req,res){
    res.send("Probando con Express");
});

const puerto = 8080;

mongoose.connect(process.env.SERVER_DB_URL)
.then(res => console.log(res,"Conectado a la bd"))
.catch(err =>console.log(err));

app.listen(puerto, ()=>{
    console.log("El servidor está escuchando :3");
});

