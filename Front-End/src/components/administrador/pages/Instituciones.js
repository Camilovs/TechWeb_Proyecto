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

export const Instituciones = () => {
  const classes = useStyles();
  const [abrirModal, setabrirModal] = useState(false);
  const [datos, setdatos] = useState();
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
  };
  function createData(name, encargado) {
    return { name, encargado };
  }
  const [vista, setvista] = useState("instituciones");
  const rows = [
    createData("Universidad de talca", "Juan"),
    createData("Universidad 2", "Pedro"),
    createData("Universidad 3", "Diego"),
    createData("Universidad 4", "Alberto"),
    createData("Universidad 5", "Juan"),
  ];

  function enviarInstitucion() {
    setabrirModal(true);
    setdatos(
      <form className={classes.root}>
        <TextField label="Nombre Institución" variant="filled" required />
        <TextField label="Encargado institución" variant="filled" required />

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
  function editarInstitucion() {
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
  function eliminarInstitucion() {
    setabrirModal(true);
    setdatos(
      <form className={classes.root}>
        ¿Seguro que quieres eliminar esta Institucion?
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
              <Tab label="Instituciones" value="1" />
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
              onClick={() => enviarInstitucion()}
              style={{
                backgroundColor: "#303e4e",
                WebkitTextFillColor: "white",
              }}
            >
              Agregar
            </Button>

            <br />
            <br />
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell> Institución</TableCell>
                    <TableCell align="right">Encargado</TableCell>
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
                      <TableCell align="right">{row.encargado}</TableCell>
                      <TableCell align="right">
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => editarInstitucion()}
                        >
                          <EditIcon />
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => eliminarInstitucion()}
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
