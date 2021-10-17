const { Router } = require("express");
const { check } = require("express-validator");
const { crearModulo } = require("../controllers/modulos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.use(validarJWT)

router.post('/', crearModulo)

module.exports = router