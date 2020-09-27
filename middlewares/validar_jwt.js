const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
    const token = req.header('x-token');
    console.log(token);

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid;
        next();
    }catch (err){
        return res.status(401).json({
            ok: false,
            msg: 'No es un token valido'
        })
    }
     
}

module.exports = {
    validarJWT
}