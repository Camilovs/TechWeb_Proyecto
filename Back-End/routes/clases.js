//ruta: host/api/clases

const { Router } = require("express");
const { check } = require("express-validator");
const { 
  getClasesModulo, 
  crearClase, 
  getClases, 
  actualizarClase, 
  eliminarClase 
} = require("../controllers/clases");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.post(
  '/', 
  [
    check('modulo', 'modulo debe ser un Id de mongo').isMongoId(),
    check('tipo', 'tipo debe ser un String').isString(),
    validarCampos
  ],
  crearClase
);

router.put(
  '/:id', 
  [
    check('modulo', 'modulo debe ser un Id de mongo').isMongoId(),
    check('tipo', "tipo debe ser un String").isString(),
    validarCampos
  ],
  actualizarClase
);

router.get('/', getClasesModulo);
router.get('/all', getClases);
router.delete('/:id', eliminarClase);

module.exports = router;
