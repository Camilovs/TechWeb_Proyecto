import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { bloques } from "../../api/bloques";
import { fetchConToken } from "../../helpers/fetch";
import { Loading } from "../shared/Loading";
import Backdrop from "@mui/material/Backdrop";
import { makeStyles } from "@material-ui/core";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
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
export const CursoCard = ({ curso }) => {
  const classes = useStyles();
  const hora_inicio = bloques[curso.horario_inicio].hora_inicio;
  const hora_fin = bloques[curso.horario_fin].hora_fin;
  const [horarios, sethorarios] = useState([]);
  const [modulos, setmodulos] = useState([]);
  const [reloadTable, setReloadTable] = useState(true);
  const [modalInformation, setmodalInformation] = useState();
  const reload = () => {
    setReloadTable(!reloadTable);
  };

  useEffect(async () => {
    setChecked([]);
    const query = await fetchConToken("clases/all", {}, "GET");
    const resp = await query.json();

    const query2 = await fetchConToken("modulos", {}, "GET");
    const resp2 = await query2.json();
    setmodulos(resp2.modulos);

    sethorarios(resp.clases);
  }, [reloadTable]);

  const inscribirClases = async (idModulo) => {
    const id = localStorage.getItem("uid");

    for (var i = 0; i < checked.length; i++) {
      if (checked[i].modulo === idModulo) {
        //console.log(checked[i]);

        const arreglo2 = {
          ...checked[i],
          estudiantes: [...checked[i].estudiantes, { codigoEstudiante: id }],
        };
        console.log(arreglo2);

        const resp = await fetchConToken(
          `clases/${checked[i]._id}`,
          arreglo2,
          "PUT"
        );
        const body = await resp.json();
      }

      handleOpen("Reservas realizadas correctamente");
      sethorarios([]);
      sethorarios([]);
      setReloadTable(!reloadTable);
    }

    /*
    
    
    */
  };

  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
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
  // OBTENER CLASES APROBADAS (TRUE) DE ESTE MODULO curso._id,id
  const [checked, setChecked] = React.useState([0]);
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  function encontrarEstudiante(array) {
    return array.find((element) => {
      return element.codigoEstudiante === localStorage.getItem("uid");
    });
  }

  const handleOpen = (info) => {
    setOpen(true);
    setmodalInformation(info);
  };

  return (
    <Grid item spacing={3} style={{ margin: "5px" }}>
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
      <Box sx={{ minWidth: 350, maxWidth: 200 }}>
        <Card variant="outlined">
          <React.Fragment>
            <CardContent>
              <Typography variant="h5" component="div">
                {curso.nombre}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {"Profesor:"} {curso.profesor}
              </Typography>

              {modulos
                .filter((modulo) => modulo.nombre === curso.nombre)
                .map((row) => (
                  <div>
                    <List
                      sx={{
                        width: "100%",
                        maxWidth: 360,
                        bgcolor: "background.paper",
                      }}
                    >
                      {horarios
                        .filter(
                          (horario) =>
                            horario.modulo === row._id &&
                            horario.aprobada &&
                            !encontrarEstudiante(horario.estudiantes)
                        )
                        .map((value) => {
                          const labelId = `checkbox-list-label-${value}`;

                          return (
                            <ListItem
                              key={value}
                              secondaryAction={
                                <IconButton
                                  edge="end"
                                  aria-label="comments"
                                ></IconButton>
                              }
                              disablePadding
                            >
                              <ListItemButton
                                role={undefined}
                                onClick={handleToggle(value)}
                                dense
                              >
                                <ListItemIcon>
                                  <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ "aria-labelledby": labelId }}
                                  />
                                </ListItemIcon>
                                <ListItemText
                                  id={labelId}
                                  primary={
                                    value.horario_dia +
                                    " (" +
                                    bloques[value.horario_inicio].hora_inicio +
                                    " - " +
                                    bloques[value.horario_fin].hora_fin +
                                    ")"
                                  }
                                />
                                <ListItemText
                                  id={labelId}
                                  primary={value.salaNombre}
                                />
                              </ListItemButton>
                            </ListItem>
                          );
                        })}
                    </List>
                    {checked.length !== 0 ? (
                      <Button
                        size="small"
                        onClick={() => {
                          inscribirClases(row._id);
                        }}
                      >
                        Reservar clases seleccionadas
                      </Button>
                    ) : (
                      ""
                    )}
                  </div>
                ))}

              {/* LA o LAS CLASES DE CADA MODULO */}
              {/* {bloques[curso.horario_inicio - 1].hora_inicio} */}
            </CardContent>
            <CardActions></CardActions>
          </React.Fragment>
        </Card>
      </Box>
    </Grid>
  );
};
