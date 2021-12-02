const { Router } = require("express");
const { crearSemestre, getSemestres } = require("../controllers/semestres");

const router = Router();

router.post('/', crearSemestre);
router.get('/', getSemestres)

module.exports = router;
