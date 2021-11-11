//RUTA /api/modulos
const { Router } = require("express");
const { check } = require("express-validator");
const { crearModulo, actualizarModulo, getModulos, eliminarModulo} = require("../controllers/modulos");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.use(validarJWT);

router.post('/', 
[
  check('nombre', 'El nombre debe ser tipo String').isString(),
  check('integrantes', 'integrantes debe ser un numero entero').isInt(),
  check('bloque_inicio', 'El bloque de inicio no es valido').isMongoId(),
  check('bloque_fin', 'El bloque de fin no es valido').isMongoId(),
  check('profesor', 'El profesor no es valido').isMongoId(),
  validarCampos
] ,
crearModulo);

router.put('/:id', 
[
  check('nombre', 'El nombre debe ser tipo String').isString(),
  check('integrantes', 'integrantes debe ser un numero entero').isInt(),
  check('bloque_inicio', 'El bloque de inicio no es valido').isMongoId(),
  check('bloque_fin', 'El bloque de fin no es valido').isMongoId(),
  check('profesor', 'El profesor no es valido').isMongoId(),
  validarCampos
],
actualizarModulo);

router.get('/',getModulos);
router.delete('/:id',eliminarModulo);


module.exports = router