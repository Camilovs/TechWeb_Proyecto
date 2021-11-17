import React, { useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Button, MenuItem } from "@material-ui/core";
import Box from "@mui/material/Box";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import { ModalProyecto } from "../components/ModalProyecto";
import { TextField } from "@mui/material";
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
const currencies = [
  {
    value: 'aforo',
    label: 'Aforo para salas',
  },
  {
    value: 'EUR',
    label: 'dato1',
  },
  {
    value: 'BTC',
    label: 'dato2',
  },
  {
    value: 'JPY',
    label: 'dato 3',
  },
];
export const Plantillas = () => {
  const classes = useStyles();

  function createData(Nombre, Tipo, Creador, UltimaEdicion, MotivoEdicion) {
    return { Nombre, Tipo, Creador, UltimaEdicion, MotivoEdicion };
  }
  const [value, setValue] = React.useState("1");
  const [vista, setvista] = useState("profesores");
  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
  };

  const rows = [
    createData(
      "Plantilla v1",
      "Aforo para salas",
      "Caiman Márquez",
      "07-10-2021",
      "Actualizacion Plan paso a paso"
    ),
  ];
  const [datos, setdatos] = useState();
  const [abrirModal, setabrirModal] = useState(false);
  const [currency, setCurrency] = React.useState("Aforo");

  const tipo = (event) => {
    setCurrency(event.target.value);
  };
  function editarPlantilla() {
    setabrirModal(true);
    
    setdatos(
      <form className={classes.root}>
          <TextField
          id="filled-select-currency"
          select
          label="Select"
          value={currency}
          onChange={e => setCurrency(e.target.value)}
          helperText="Por favor, ingrese el tipo de edición"
          variant="filled"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        
        <TextField
          id="filled-number"
          label="Aforo máximo"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
        />
      
      <TextField label="Motivo edición" variant="filled" required />
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
  function eliminarPlantilla() {
    setabrirModal(true);
    setdatos(
      <form className={classes.root}>
        ¿Seguro que quieres eliminar esta plantilla?
        <div>
          <Button variant="contained">Cancel</Button>
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
    <div
      className={{
        flexGrow: 1,
        backgroundColor: "white",
        
      }}
    >
      <ModalProyecto Datos={datos} open={abrirModal} setOpen={setabrirModal} />
      <Box sx={{ width: "100%", typography: "body1", paddingBlockEnd: "100%"}}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Plantillas Actuales" value="1" />
              <Tab label="Nueva Plantilla" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1" onClick={() => setvista("PlantillasActuales")}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Nombre</TableCell>
                    <TableCell align="right">Tipo</TableCell>
                    <TableCell align="right">Creado por:</TableCell>
                    <TableCell align="right">Última edición</TableCell>
                    <TableCell align="right">Motivo modificación</TableCell>
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
                        {row.Nombre}
                      </TableCell>
                      <TableCell align="right">{row.Tipo}</TableCell>
                      <TableCell align="right">{row.Creador}</TableCell>
                      <TableCell align="right">{row.UltimaEdicion}</TableCell>
                      <TableCell align="right">{row.MotivoEdicion}</TableCell>
                      <TableCell align="right">
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => editarPlantilla()}
                        >
                          <EditIcon />
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => eliminarPlantilla()}
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
          <TabPanel value="2" onClick={() => setvista("NuevasPlantillas")}>
            Crear nueva plantilla
          </TabPanel>
          <TabPanel value="3">Encargados</TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};
