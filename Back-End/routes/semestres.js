const { Router } = require("express");
const { crearSemestre, getSemestres, getSemestreActual } = require("../controllers/semestres");

const router = Router();

router.post('/', crearSemestre);

router.get('/actual', getSemestreActual)
router.get('/', getSemestres)

module.exports = router;
