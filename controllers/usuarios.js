const { response } = require('express');
const Usuario = require('../models/usuario');

const getUsuarios = async (req, res=response) => {
    try {
        const desde = Number(req.query.desde) || 0; 

        const usuarios = await Usuario
        .find({
            _id: { $ne:req.uid }
        })
        .sort('-online')
        .skip(desde)
        .limit(20)
        .exec();


        res.json({
            ok: true,
            msg: 'Se han encontrado usuarios',
            desde,
            usuarios
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg:'No se logro recuperar los usuarios'
        });
    }
}

module.exports = {
    getUsuarios
}