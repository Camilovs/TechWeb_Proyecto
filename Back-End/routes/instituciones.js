const { Router } = require("express");
const { check } = require("express-validator");
const { crearInstitucion, getInstituciones, eliminarInstitucion } = require("../controllers/instituciones");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.use(validarJWT);

router.post('/', crearInstitucion);
router.get('/', getInstituciones);
router.delete('/', eliminarInstitucion);

module.exports = router