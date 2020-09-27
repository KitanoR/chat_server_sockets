const { response } = require('express');
const Mensaje = require('../models/mensaje');

const getMensajes = async (req, res=response) => {
    try {
        const miId = req.uid;
        const mensajesDe = req.params.de;

        const mensajes = await Mensaje.find({
            $or: [{de: miId, para: mensajesDe}, { de: mensajesDe, para: miId }]
        })
        .sort({createdAt: 'desc'})
        .limit(30)

        res.json({
            ok: true,
            msg: 'Mensajes recuperados',
            mensajes
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'No se pudo recuperar'
        })
    }
}

module.exports = {
    getMensajes
}