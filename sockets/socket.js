const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { cambiarEstadoUsuario, guardarMensaje } = require('../controllers/socket');


// Mensajes de Sockets
io.on('connection', (client) => {
    console.log('Cliente conectado');

    const [ valido, uid ] = comprobarJWT(client.handshake.headers['x-token']);
    if(!valido) { return client.disconnect(); }

    // usuario autenticado
    cambiarEstadoUsuario(uid, true);

    // ingresar al usuario en una sala
    // sala global, cliente.id

    client.join(uid);
    // client.to(uid).emit('');

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
        cambiarEstadoUsuario(uid, false);
    });

    client.on('mensaje-personal', async ( payload ) => {
        console.log('Mensaje', payload);
        await guardarMensaje(payload);
        io.to(payload.para).emit('mensaje-personal', payload);
        // io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

    });


});
