const Usuario = require('../models/usuario');
const Mensaje = require('../models/mensaje');

const cambiarEstadoUsuario = async (uid = '', online=true) => {
    const usuario = await Usuario.findById(uid);
    usuario.online = online;
    await usuario.save();
    return usuario;
}

const guardarMensaje = async(payload) => {
    /**
     * payload     * 
        {
            de:'',
            para:'',
            mensaje:'
        }
     */
    try {
        const mensaje = new Mensaje(payload);
        mensaje.save();
        return true;
    } catch (error) {
        return false;
    }
}

module.exports = {
    cambiarEstadoUsuario,
    guardarMensaje
}