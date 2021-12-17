import React, { useEffect, useState } from "react";

import { fetchConToken } from "../../helpers/fetch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import Backdrop from "@mui/material/Backdrop";
import { makeStyles } from "@material-ui/core";
import { bloques } from "../../api/bloques";
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
export const VistaReservas = () => {
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
  const [horarios, sethorarios] = useState([]);
  const [modulos, setmodulos] = useState([]);
  const [reloadTable, setreload] = useState(true);
  const [modalInformation, setmodalInformation] = useState("");
  const classes = useStyles();
  useEffect(async () => {
    const query = await fetchConToken("clases/all", {}, "GET");
    const resp = await query.json();

    const query2 = await fetchConToken("modulos", {}, "GET");
    const resp2 = await query2.json();
    setmodulos(resp2.modulos);

    sethorarios(resp.clases);
  }, [reloadTable]);

  const reload = () => setreload(!reloadTable);

  function encontrarEstudiante(array) {
    return array.find((element) => {
      return element.codigoEstudiante === localStorage.getItem("uid");
    });
  }
  const cancelarReserva = async (valores) => {
    //console.log(checked[i]);
    var datos = [valores.estudiantes].filter(
      (valor) => valor.codigoEstudiante === localStorage.getItem("uid")
    );
    console.log(datos);

    const arreglo2 = {
      ...valores,
      estudiantes: [...datos],
    };

    const resp = await fetchConToken(`clases/${valores._id}`, arreglo2, "PUT");
    const body = await resp.json();
    handleOpen("Reserva cancelada con éxito");
    reload();
  };
  const [open, setOpen] = useState(false);
  const handleOpen = (info) => {
    setOpen(true);
    setmodalInformation(info);
  };
  const handleClose = () => setOpen(false);
  return (
    <div>
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
          <Box sx={style}>{modalInformation}</Box>
        </Fade>
      </Modal>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Módulo</TableCell>
              <TableCell align="right"> Sala</TableCell>
              <TableCell align="right">Horario</TableCell>
              <TableCell align="right">Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {horarios
              .filter((horario) => encontrarEstudiante(horario.estudiantes))
              .map((row) => (
                <TableRow
                  key={row.salaNombre}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.moduloNombre}
                  </TableCell>
                  <TableCell align="right">{row.salaNombre}</TableCell>
                  <TableCell align="right">
                    {row.horario_dia +
                      " (" +
                      bloques[row.horario_inicio].hora_inicio +
                      " - " +
                      bloques[row.horario_fin].hora_fin +
                      ")"}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      color="error"
                      variant="text"
                      onClick={() => cancelarReserva(row)}
                    >
                      <CancelIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
