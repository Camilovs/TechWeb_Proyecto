import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";

import { Button, TextField } from "@material-ui/core";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";

import Box from "@mui/material/Box";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import { makeStyles } from "@material-ui/core";
import { fetchConToken } from "../../../helpers/fetch";

import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
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
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const classes = useStyles();
  const [abrirModal, setabrirModal] = useState(false);
  const [datos, setdatos] = useState();
  const [value, setValue] = React.useState("1");
  const [instituciones, setinstituciones] = useState([]);
  const [reloadTable, setReloadTable] = useState(true);
  const [open, setOpen] = useState(false);
  const [currencies, setcurrencies] = useState([]);
  const [encargadoId, setencargadoId] = useState("");
  const [nombreInstitucion, setnombreInstitucion] = useState("");
  const [vista, setvista] = useState([]);
  const [modalDelete, setmodalDelete] = useState(false);
  const [institucionEliminar, setInstitucionEliminar] = useState("");

  function clearState() {
    setnombreInstitucion("");
    setencargadoId("");
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
  };
  function createData(name, encargado) {
    return { name, encargado };
  }
  const reload = () => {
    setReloadTable(!reloadTable);
  };

  useEffect(async () => {
    const query = await fetchConToken("instituciones", {}, "GET");
    const resp = await query.json();
    console.log(resp.instituciones[0].nombre);
    setinstituciones(resp.instituciones);
    console.log(instituciones);
  }, [reloadTable]);

  useEffect(async () => {
    const query = await fetchConToken("usuarios", {}, "GET");
    const resp = await query.json();
    setcurrencies(resp.usuarios);
  }, []);

  const eliminarInstitucion = async () => {
    console.log("Borrando Institucion");
    const query = await fetchConToken(
      `instituciones/${institucionEliminar._id}`,
      {},
      "DELETE"
    );
    console.log(await query.json());
    setmodalDelete(false);
    reload();
  };

  function modalDeleteOpen(institucion) {
    console.log("eliminar " + institucion._id);
    setInstitucionEliminar(institucion);
    setmodalDelete(true);
  }

  const crearInstitucion = async () => {
    const resp = await fetchConToken(
      "instituciones",
      {
        encargado: encargadoId,
        nombre: nombreInstitucion,
      },
      "POST"
    );
    const body = await resp.json();
    setOpen(false);
    reload();
    clearState();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    clearState();
  };
  const modalDeleteClose = () => setmodalDelete(false);
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
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open} className={classes.root}>
                <Box sx={style}>
                  <TextField
                    label="Nombre Institución"
                    variant="filled"
                    required
                    value={nombreInstitucion}
                    onChange={(event) => {
                      setnombreInstitucion(event.target.value);
                    }}
                  />
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Select"
                    value={encargadoId}
                    onChange={(event) => {
                      setencargadoId(event.target.value);
                    }}
                    helperText="Please select your currency"
                  >
                    {currencies
                      .filter((encargado) => encargado.rol === "Encargado")
                      .map((option) => (
                        <MenuItem key={Math.random()} value={option._id}>
                          {option.nombre}
                        </MenuItem>
                      ))}
                  </TextField>
                  <div>
                    <Button variant="contained" onClick={() => handleClose()}>
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      style={{
                        backgroundColor: "#303e4e",
                        WebkitTextFillColor: "white",
                      }}
                      onClick={() => crearInstitucion()}
                    >
                      Crear
                    </Button>
                  </div>
                </Box>
              </Fade>
            </Modal>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={modalDelete}
              onClose={modalDeleteClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={modalDelete} className={classes.root}>
                <Box sx={style}>
                  <div>¿Seguro que quieres eliminar esta Institucion?</div>
                  <div>{institucionEliminar.nombre}</div>
                  <div>
                    <Button variant="contained" onClick={modalDeleteClose}>
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      style={{
                        backgroundColor: "#303e4e",
                        WebkitTextFillColor: "white",
                      }}
                      onClick={() => eliminarInstitucion()}
                    >
                      Eliminar
                    </Button>
                  </div>
                </Box>
              </Fade>
            </Modal>

            <Button
              size="small"
              variant="contained"
              onClick={() => handleOpen()}
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
                    <TableCell align="center"> Institución</TableCell>
                    <TableCell align="center">Nombre encargado</TableCell>
                    <TableCell align="center">Email encargado</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                {instituciones.length !== 0 ? (
                  <TableBody>
                    {instituciones.map((row) => (
                      <TableRow
                        key={Math.random()}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center" component="th" scope="row">
                          {row.nombre}
                        </TableCell>
                        <TableCell align="center">
                          {row.encargados[0].nombre}
                        </TableCell>
                        <TableCell align="center">
                          {row.encargados[0].email}
                        </TableCell>
                        <TableCell align="right">
{/*
                          <Button variant="outlined" size="small">
                            <EditIcon />
                          </Button>
*/}
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => modalDeleteOpen(row)}
                          >
                            <DeleteIcon />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                ) : (
                  <TableBody></TableBody>
                )}
              </Table>
            </TableContainer>
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};
