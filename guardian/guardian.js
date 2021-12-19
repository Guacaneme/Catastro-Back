const { verify } = require("jsonwebtoken");

const guardian = (req, res, next) =>{
    const autorization = req.headers.autorization;
    if(!autorization){
        next(JSON.stringify({estado:"error", msg:"No autorizado"}));
    }
    try{
        const t = autorization.split(" ")[1];
        const payload = verify(t,"misecreto");
        if (payload.rol !== " "){
            next(JSON.stringify({estado:"error", msg:"No autorizado"}));
        }
    }
    
    catch(e){
        console.log(e);
    }
    return next();
}

exports.guardian = guardian;