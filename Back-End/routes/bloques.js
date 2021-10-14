//RUTA host/api/bloque

const { Router } = require("express");
const { crearBloques, getBloques } = require("../controllers/bloques");
const { validarJWT } = require("../middlewares/validar-jwt");


const router = Router();


router.use(validarJWT);

router.post('/', crearBloques)
router.get('/', getBloques)

module.exports = router