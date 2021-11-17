import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Button, TextField } from "@material-ui/core";
import EditIcon from "@mui/icons-material/Edit";
import { ModalProyecto } from "../components/ModalProyecto";
import Box from "@mui/material/Box";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import { makeStyles } from "@material-ui/core";
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

export const Salas = () => {
  const classes = useStyles();
  const [abrirModal, setabrirModal] = useState(false);
  const [datos, setdatos] = useState();
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
  };
  function createData(name, calories) {
    return { name, calories };
  }
  const [vista, setvista] = useState("Salas");
  const rows = [
    createData("Internet de las cosas", 159),
    createData("Tecnologias wev", 237),
    createData("Taller de desarrollo de software", 262),
    createData("Tecnologias móviles", 305),
    createData("Recursos humanos", 356),
  ];

  function enviarSala() {
    setabrirModal(true);
    setdatos(
      <form className={classes.root}>
        <TextField label="Nombre sala" variant="filled" required />
        

        <div>
          <Button variant="contained">Cancelar</Button>
          <Button
            type="submit"
            variant="contained"
            style={{ backgroundColor: "#303e4e", WebkitTextFillColor: "white" }}
          >
            Crear
          </Button>
        </div>
      </form>
    );
  }
  function editarSala() {
    setabrirModal(true);
    setdatos(
      <form className={classes.root}>
        <TextField label="Nombre sala" variant="filled" required />

        <div>
          <Button variant="contained">Cancelar</Button>
          <Button
            type="submit"
            variant="contained"
            style={{ backgroundColor: "#303e4e", WebkitTextFillColor: "white" }}
          >
            Editar
          </Button>
        </div>
      </form>
    );
  }
  function eliminarSala() {
    setabrirModal(true);
    setdatos(
      <form className={classes.root}>
        ¿Seguro que quieres eliminar esta sala?
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

  return (
    <div
      style={{ flexGrow: 1, backgroundColor: "white", paddingBlockEnd: "100%" }}
    >
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Salas" value="1" />
            </TabList>
          </Box>
          <TabPanel value="1" onClick={() => setvista("Salas")}>
            <ModalProyecto
              Datos={datos}
              open={abrirModal}
              setOpen={setabrirModal}
            />
            <Button
              size="small"
              variant="contained"
              onClick={() => enviarSala()}
              style={{
                backgroundColor: "#303e4e",
                WebkitTextFillColor: "white",
              }}
            >
              Crear sala
            </Button>

            <br />
            <br />
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell> Modulo</TableCell>
                    <TableCell align="right">Sala</TableCell>
                    <TableCell align="right">Editar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => editarSala()}
                        >
                          <EditIcon />
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => eliminarSala()}
                        >
                          <DeleteIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};
