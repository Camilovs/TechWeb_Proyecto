import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import { makeStyles } from "@material-ui/core";

import { Button } from "@material-ui/core";
import EditIcon from "@mui/icons-material/Edit";
import { TextField } from "@mui/material";

import { fetchConToken } from "../../../../helpers/fetch";

import Backdrop from "@mui/material/Backdrop";

import Box from "@mui/material/Box";
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
export const GestionAdministradores = () => {
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
  const [nombreAdmin, setnombreAdmin] = useState("");
  const [emailAdmin, setemailAdmin] = useState("");
  const [passwordAdmin, setpasswordAdmin] = useState("");
  const [reloadTable, setReloadTable] = useState(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const classes = useStyles();
  const [abrirModal, setabrirModal] = useState(false);
  const [Datos, setDatos] = useState();
  const [administradores, setadministradores] = useState([]);

  function createData(nombre, matricula, rut) {
    return { nombre, matricula, rut };
  }
  useEffect(async () => {
    const query = await fetchConToken("usuarios", {}, "GET");
    const resp = await query.json();

    setadministradores(resp.usuarios);
  }, [reloadTable]);

  const crearUsuario = async () => {
    const resp = await fetchConToken(
      "usuarios/newuser",
      {
        nombre: nombreAdmin,
        email: emailAdmin,
        pass: passwordAdmin,

        rol: "Admin",
      },
      "POST"
    );
    const body = await resp.json();
    handleClose();
    reload();
  };

  const reload = () => {
    setReloadTable(!reloadTable);
    setnombreAdmin("");
    setpasswordAdmin("");
    setemailAdmin("");
  };
  const eliminarAdmin= async (valores)=> {
    
    const resp = await fetchConToken(
      `usuarios/${valores._id}`,
        {},
      "DELETE"
    );
    const body = await resp.json();
   
    reload();
  }
  return (
    <div>
      <Button
        onClick={() => handleOpen()}
        size="small"
        variant="contained"
        style={{ backgroundColor: "#303e4e", WebkitTextFillColor: "white" }}
      >
        Agregar
      </Button>

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
              label="Nombre"
              variant="filled"
              required
              onChange={(e) => setnombreAdmin(e.target.value)}
            />
            <TextField
              label="Email"
              variant="filled"
              type="email"
              required
              onChange={(e) => setemailAdmin(e.target.value)}
            />
            <TextField
              label="Password"
              variant="filled"
              type="password"
              onChange={(e) => setpasswordAdmin(e.target.value)}
            />
            <div>
              <Button variant="contained">Cancel</Button>
              <Button
                onClick={() => crearUsuario()}
                variant="contained"
                style={{
                  backgroundColor: "#303e4e",
                  WebkitTextFillColor: "white",
                }}
              >
                Crear
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
      <br />
      <br />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell> Nombre</TableCell>
              <TableCell> Email</TableCell>

              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {administradores.length !== 0
              ? administradores
                  .filter((admin) => admin.rol === "Admin")
                  .map((row) => (
                    <TableRow
                      key={row.nombre}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.nombre}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.email}
                      </TableCell>
                      <TableCell align="right">
                        {localStorage.getItem("uid") !== row._id ? (
                          <div>
 
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => eliminarAdmin(row)}
                            >
                              <DeleteIcon />
                            </Button>
                          </div>
                        ) : (
                          ""
                        )}
                      </TableCell>
                    </TableRow>
                  ))
              : ""}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
