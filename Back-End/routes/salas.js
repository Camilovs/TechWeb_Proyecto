//RUTA: host + /api/salas

const { Router } = require("express");
const { check } = require("express-validator");
const { 
  getSala, 
  crearSala, 
  actualizarSala, 
  eliminarSala, 
  getSalas, 
  actualizarAforo, 
  agregarBloqueOcupado 
} = require("../controllers/salas");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");


const router = Router();

//CUALQUIER PETICION DEL CRUD DE SALAS PASA PRIMERO POR VALIDACION DEL TOKEN
router.use(validarJWT);

//RUTAS
//ruta para obtener una sala
router.get('/:id', getSala);
router.get('/', getSalas);

//ruta para agregar una sala
router.post('/', 
[
  check('nombre', 'el nombre es obligatorio').not().isEmpty(),
  check('aforo', 'el aforo debe ser numerico').isInt(),
  validarCampos
],
crearSala);

//ruta para actualizar una sala
router.put('/:id',
[
  check('nombre', 'el nombre es obligatorio').not().isEmpty(),
  check('aforo', 'el aforo debe ser numerico').isInt(),
  validarCampos
],
actualizarSala);

router.put('/updateAforo/:id',
[
  check('aforo', 'el aforo debe ser numerico').isInt(),
  validarCampos
],
actualizarAforo);

router.put('/updateOcupado/:id',
[
  check('ocupada','los bloques ocupados deben ser un array').isArray(),
  validarCampos
],
agregarBloqueOcupado);

//ruta para eliminar una sala
router.delete('/:id', eliminarSala);


module.exports = router;