const { Router } = require("express");
const { check } = require("express-validator");
const { 
  getUsuarios,
  eliminarUsuario,
  actualizarUsuario,
  crearUsuario 
} = require("../controllers/usuarios");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");


const router = Router();

router.use(validarJWT);

router.post('/', 
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(), //el nombre no debe estar vacio
    check('email', 'El email es obligatorio').isEmail(), //el email debe ser formato email
    check('pass', 'El password debe ser de 6 caracteres').isLength({min:6}), //el email debe ser formato email
    check('rol', 'El rol es obligatorio').not().isEmpty(), //el email debe ser formato email
    validarCampos
  ], 
  crearUsuario);

router.put('/:id', 
  [
    check('nombre', 'El nombre debe ser un String').isString(),
    check('email', 'El email no tiene formato correcto').isEmail(), //el email debe ser formato email
    check('pass', 'El password debe ser de 6 caracteres').isLength({min:6}), //el email debe ser formato email
    check('rol', 'El rol debe ser un String').isString(), 
    validarCampos
  ],
  actualizarUsuario);

router.delete('/:id', eliminarUsuario);
router.get('/', getUsuarios);

module.exports = router;