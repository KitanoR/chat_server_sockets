const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generateJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res=response) => {
    try {
        const { email, password } = req.body;

        const existeEmail = await Usuario.findOne({email});
        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'Las credenciales no son validas'
            })
        }
        const usuario = new Usuario(req.body);
        // Encriptar contrasenia
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        await usuario.save();

        // generar jwt
        const token = await generateJWT(usuario.id);

        res.json({
            ok: true,
            msg:'creando usuario!!!',
            usuario,
            token
        });
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'No se logro guardar el usuario'
        })
    }
}


const loginUsuario = async(req, res=response) => {
    const { email, password } = req.body;
    try {
        const usuario = await Usuario.findOne({ email }).exec();
        if(!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'Las credenciales no son validas'
            })
        }

        //validad password
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if(!validPassword){
            return res.status(404).json({
                ok: false,
                msg: 'Las credenciales no son validas'
            })
        }

        // generar jwt
        const token = await generateJWT(usuario.id);

        return res.json({
            ok: true,
            msg:'login correcto',
            usuario,
            token
        });

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'No se logro iniciar sesion'
        })
    }
    
}


const renewToken = async (req, res=response) => {
    const uid = req.uid;

    try {
        const usuario = await Usuario.findById(uid).exec();
        if(!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'Las credenciales no son validas'
            })
        }

        // generar jwt
        const token = await generateJWT(usuario.id);

        return res.json({
            ok: true,
            msg:'login correcto',
            usuario,
            token
        });

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'No se logro iniciar sesion'
        })
    }
     


}

module.exports = {
    crearUsuario,
    loginUsuario,
    renewToken
}