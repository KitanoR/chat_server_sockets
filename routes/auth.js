/*
    path: api/login
*/

const { Router } = require('express');
const { check } = require('express-validator');


const { crearUsuario, loginUsuario, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar_campos');
const { validarJWT } = require('../middlewares/validar_jwt');

const router = Router();


router.post('/new', [
    check('nombre', 'Nombre es obligatorio').not().isEmpty(),
    check('email', 'Email es obligatorio').not().isEmpty(),
    check('password', 'Password es obligatorio').not().isEmpty(),
    check('email').matches(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).withMessage('No es correo valido'),
    check('password').isLength({ min: 5 }).withMessage('Debe de ser una contraseña mayor a 5 campos'),
    validarCampos
] ,crearUsuario);

router.post('/', [
    check('email', 'Email es obligatorio').not().isEmpty(),
    check('password', 'Password es obligatorio').not().isEmpty(),
    check('email').matches(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).withMessage('No es correo valido'),
    check('password').isLength({ min: 5 }).withMessage('Debe de ser una contraseña mayor a 5 campos'),
    validarCampos
] ,loginUsuario);

router.get('/renew', validarJWT, renewToken)
module.exports = router;

