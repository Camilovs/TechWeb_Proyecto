const { response } = require("express");
const Clase = require("../models/Clase");
const Modulo = require("../models/Modulo");
const Sala = require("../models/Sala");

const crearClase = async (req, res = response) => {
  const { modulo } = req.body;
  try {
    const moduloFind = await Modulo.findById(modulo);

    if (!moduloFind) {
      return res.status(404).json({
        ok: false,
        msg: "No existe el modulo",
      });
    }

    const clase = new Clase(req.body);
    await clase.save();
    res.json({
      ok: true,
      msg: "Clase creada",
      clase,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error en bd crear Clase",
    });
  }
};
const getClases = async (req, res = response) => {
  try {
    const clases = await Clase.find();
    console.log(clases);
    if (!clases) {
      return res.status(404).json({
        ok: false,
        msg: "No existen clases creadas",
      });
    }
    res.json({
      ok: true,
      msg: "Clases encontradas",
      clases,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error en bd obtener clases",
    });
  }
};
const getClasesModulo = async (req, res = response) => {
  const { modulo: moduloId } = req.body;

  try {
    const modulo = await Modulo.findById(moduloId);
    if (!modulo) {
      return res.status(404).json({
        ok: false,
        msg: "No existe el modulo",
      });
    }
    const clases = await Clase.find({ modulo: moduloId });
    if (!clases) {
      return res.status(404).json({
        ok: false,
        msg: "No existen para el modulo",
      });
    }
    res.json({
      ok: true,
      msg: "Clases encontradas para el modulo",
      clases,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error en bd get Clases de  modulo",
    });
  }
};
const actualizarClase = async (req, res = response) => {
  const claseId = req.params.id;
  const { modulo, tipo } = req.body;

  try {
    const clase = Clase.findById(claseId);

    if (!clase) {
      return res.status(404).json({
        ok: false,
        msg: "la clase no existe",
      });
    }
    if (modulo) {
      const moduloClase = await Modulo.findById(modulo);
      if (!moduloClase) {
        return res.status(404).json({
          ok: false,
          msg: "el modulo no existe",
        });
      }
    }
    if (tipo && (tipo === "Unica" || tipo == "Recurrente")) {
      const claseUpdate = await Clase.findByIdAndUpdate(claseId, req.body, {
        new: true,
      });
      return res.json({
        ok: true,
        msg: "Clase actualizado",
        clase: claseUpdate,
      });
    } else {
      return res.status(404).json({
        ok: false,
        msg: "el tipo debe ser Unica o Recurrente",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "error en bd, actualizar clase",
    });
  }
};
const eliminarClase = async (req, res = response) => {
  const claseId = req.params.id;

  try {
    const clase = await Clase.findById(claseId);
    if (!clase) {
      res.status(400).json({
        ok: false,
        msg: "La clase no existe",
      });
    }

    await Clase.findByIdAndDelete(claseId);
    res.json({
      ok: true,
      msg: "Clase eliminada",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "error en bd, obtener clase",
    });
  }
};
const getClasesSala = async (req, res = response) => {
  const salaID = req.params.id;
  try {
    const sala = await Sala.findById(salaID);
    if (!sala) {
      return res.status(404).json({
        ok: false,
        msg: "Sala no encontrada",
      });
    }
    const clases = await Clase.find({ sala: salaID });
    if (!clases) {
      return res.status(404).json({
        ok: false,
        msg: "Clases no encontradas",
      });
    }

    res.status(200).json({
      ok: true,
      clases,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "error en bd, obtener clases de sala",
    });
  }
};

const getSolicitudes = async (req, res = response) => {
  try {
    const solicitudes = await Clase.find({ aprobada: 0 });
    return res.status(200).json({
      ok: true,
      msg: "Solicitudes encontradas",
      solicitudes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "error en bd, getSolicitudes",
    });
  }
};

const aprobarSolicitud = async (req, res = response) => {
  const idClase = req.params.id;
  const idSala = req.body.idSala;
  try {
    const clase = await Clase.findByIdAndUpdate(
      idClase,
      { aprobada: true },
      { new: true }
    );
    const sala = await Sala.findById(idSala);
    for (
      let numBloque = clase.horario_fin;
      numBloque >= clase.horario_inicio;
      numBloque--
    ) {
      sala.ocupada.push({
        numero: numBloque,
        modulo: clase.moduloNombre,
        dia: clase.horario_dia,
      });
    }
    await sala.save();
    res.status(200).json({
      ok: true,
      msg: "Clase aprobada",
      clase,
      bloques: sala.ocupada,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "error en bd, aprobarSolicitud",
    });
  }
};

module.exports = {
  actualizarClase,
  crearClase,
  eliminarClase,
  getClases,
  getClasesModulo,
  getClasesSala,
  getSolicitudes,
  aprobarSolicitud,
};
