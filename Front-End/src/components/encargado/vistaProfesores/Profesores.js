import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { DropzoneAreaBase } from "material-ui-dropzone";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Button, makeStyles } from "@material-ui/core";
import EditIcon from "@mui/icons-material/Edit";
import { TextField } from "@mui/material";
import { ModalProyecto } from "../../administrador/components/ModalProyecto";
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
export const Profesores = () => {
  const classes = useStyles();
  const [abrirModal, setabrirModal] = useState(false);
  const [Datos, setDatos] = useState();
  const datosNuevaSala = {
    nombre: "",
    nroSala: 0,
  };
  const [files, setFiles] = useState([]);

  const handleAdd = (newFiles) => {
    newFiles = newFiles.filter(
      (file) => !files.find((f) => f.data === file.data)
    );
    setFiles([...files, ...newFiles]);
  };

  const handleDelete = (deleted) => {
    setFiles(files.filter((f) => f !== deleted));
  };
  function createData(nombre, rut) {
    return { nombre, rut };
  }

  const rows = [
    createData("Pedro Avendaño", "12345678-9"),
    createData("Juan Rodriguez", "12345678-9"),
    createData("Alberto Toledo", "12345678-9"),
    createData("Mauricio Reyes", "123456789-9"),
  ];

  function enviarProfesor() {
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
  function editarProfesor() {
    setabrirModal(true);
    setDatos(
      <form className={classes.root}>
        <TextField label="First Name" variant="filled" required />
        <TextField label="Last Name" variant="filled" required />
        <TextField label="Email" variant="filled" type="email" required />
        <TextField label="Password" variant="filled" type="password" required />
        <div>
          <Button variant="contained">Cancelar</Button>
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
  function cargarProfesores() {
    setabrirModal(true);
    setDatos(
      <form className={classes.root}>
        Suba el archivo con los datos de profesores:
        <div>
          <DropzoneAreaBase
            fileObjects={files}
            onAdd={handleAdd}
            onDelete={handleDelete}
          />
          <Button
            type="submit"
            variant="contained"
            style={{ backgroundColor: "#303e4e", WebkitTextFillColor: "white" }}
          >
            Subir
          </Button>
        </div>
      </form>
    );
  }
  function eliminarProfesor() {
    setabrirModal(true);
    setDatos(
      <form className={classes.root}>
        ¿Seguro que quieres eliminar a este profesor?
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
        <h3 style={{ marginLeft: "20px", padding: "10px" }}>Profesores</h3>
      </div>

      <div className="container mt-5">
        <Button
          size="small"
          variant="contained"
          style={{
            margin: "1px",
            backgroundColor: "#303e4e",
            WebkitTextFillColor: "white",
            marginBottom: "30px",
          }}
          onClick={() => enviarProfesor()}
        >
          Agregar
        </Button>
        <Button
          size="small"
          variant="contained"
          style={{
            marginLeft: "5px",
            backgroundColor: "#303e4e",
            WebkitTextFillColor: "white",
            marginBottom: "30px",
          }}
          onClick={() => cargarProfesores()}
        >
          Agregar masivo
        </Button>
        <ModalProyecto
          Datos={Datos}
          open={abrirModal}
          setOpen={setabrirModal}
          vistaActual="Crear estudiantes"
          obtenerDatos={datosNuevaSala}
        />

        <TableContainer component={Paper} style={{ marginBottom: "20px" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell> Nombre</TableCell>

                <TableCell> rut</TableCell>

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
                    {row.rut}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => editarProfesor()}
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => eliminarProfesor()}
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
