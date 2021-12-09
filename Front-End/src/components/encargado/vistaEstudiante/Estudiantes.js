import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import { Divider, makeStyles, Typography } from "@material-ui/core";
import Avatar from "@mui/material/Avatar";
import { ModalProyecto } from "../../administrador/components/ModalProyecto";
import { deepOrange } from "@mui/material/colors";
import { Button } from "@material-ui/core";
import EditIcon from "@mui/icons-material/Edit";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),

    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "300px",
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },
  },
}));
export const Estudiantes = () => {
  const classes = useStyles();
  const [abrirModal, setabrirModal] = useState(false);
  const [Datos, setDatos] = useState();
  function createData(nombre, matricula, rut) {
    return { nombre, matricula, rut };
  }

  const datosNuevaSala = {
    nombre: "",
    nroSala: 0,
  };
  const rows = [
    createData("Santiago Salazar", 2025123456, "12345678-9"),
    createData("Pedro Ubilla", 2025123456, "12345678-9"),
    createData("Carlos Vargas", 2025123456, "12345678-9"),
    createData("Roberto Gonzalez", 2025123456, "12345678-9"),
  ];

  function enviarEstudiante() {
    setabrirModal(true);
    setDatos(
      <form className={classes.root}>
        <TextField label="First Name" variant="filled" required />
        <TextField label="Last Name" variant="filled" required />
        <TextField label="Email" variant="filled" type="email" required />
        <TextField label="Password" variant="filled" type="password" required />
        <div>
          <Button variant="contained">Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            style={{ backgroundColor: "#303e4e", WebkitTextFillColor: "white" }}
          >
            Signup
          </Button>
        </div>
      </form>
    );
  }
  function editarEstudiante() {
    setabrirModal(true);
    setDatos(
      <form className={classes.root}>
        <TextField label="First Name" variant="filled" required />
        <TextField label="Last Name" variant="filled" required />
        <TextField label="Email" variant="filled" type="email" required />
        <TextField label="Password" variant="filled" type="password" required />
        <div>
          <Button variant="contained">Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            style={{ backgroundColor: "#303e4e", WebkitTextFillColor: "white" }}
          >
            Signup
          </Button>
        </div>
      </form>
    );
  }
  function elimianrEstudiante() {
    setabrirModal(true);
    setDatos(
      <form className={classes.root}>
        ¿Seguro que quieres eliminar a este estudiante?
        <div>
          <Button variant="contained">Cancelar</Button>
          <Button
            type="submit"
            variant="contained"
            style={{ backgroundColor: "#303e4e", WebkitTextFillColor: "white" }}
          >
            Eliminar
          </Button>
        </div>
      </form>
    );
  }

  return (
    <Box className="card" style={{ paddingBlockEnd: "10%" }}>
      <div className="card-header">
        <h3 style={{ marginLeft: "20px", padding: "10px" }}>Estudiantes</h3>
      </div>
      <div className="container mt-5">
        <Button
          onClick={() => enviarEstudiante()}
          size="small"
          variant="contained"
          style={{ backgroundColor: "#303e4e", WebkitTextFillColor: "white" }}
        >
          Crear Estudiante
        </Button>

        <ModalProyecto
          Datos={Datos}
          open={abrirModal}
          setOpen={setabrirModal}
          vistaActual="Crear estudiantes"
          obtenerDatos={datosNuevaSala}
        />
        <br />
        <br />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell> Nombre</TableCell>
                <TableCell> Matrícula</TableCell>
                <TableCell> Rut</TableCell>

                <TableCell align="right">Editar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.nombre}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.nombre}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.matricula}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.rut}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => editarEstudiante()}
                    >
                      <EditIcon />
                    </Button>

                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => elimianrEstudiante()}
                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Box>
  );
};
