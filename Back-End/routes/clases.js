//ruta: host/api/clases

const { Router } = require("express");
const { check } = require("express-validator");
const { 
  getClasesModulo, 
  crearClase, 
  getClases, 
  actualizarClase, 
  eliminarClase, 
  getClasesSala,
  getSolicitudes,
  aprobarSolicitud
} = require("../controllers/clases");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.post('/byModulo', getClasesModulo);
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

router.put('/aprobar/:id', aprobarSolicitud);
router.get('/solicitudes', getSolicitudes);
router.get('/sala/:id', getClasesSala);
router.get('/all', getClases);
router.delete('/:id', eliminarClase);


module.exports = router;
