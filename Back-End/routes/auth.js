//estamos en host/api/auth

const {Router} = require('express');
const { check } = require('express-validator');
const { crearEstudiante, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

// crear estudiante
router.post(
  '/new', //url
  [ //middlewares
    check('nombre', 'El nombre es obligatorio').not().isEmpty(), //el nombre no debe estar vacio
    check('email', 'El email es obligatorio').isEmail(), //el email debe ser formato email
    check('pass', 'El password debe ser de 6 caracteres').isLength({min:6}), //el email debe ser formato email
    validarCampos //si validarCampos encuentra un error, no permite que se ejecute el controlador crearUsuario.
  ], 
  crearEstudiante //controlador
);

// verificar y revalidar el token de usuario
router.get('/renew', validarJWT, revalidarToken );

// login de usuario
router.post(
  '/',
  [
    check('email', 'El email es obligatorio').isEmail(), //el email debe ser formato email
    check('pass', 'El password debe ser de 6 caracteres').isLength({min:6}), //el email debe ser formato email
    validarCampos
  ], 
  loginUsuario 
);

module.exports = router;