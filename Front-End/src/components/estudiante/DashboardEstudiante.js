import React, { Fragment, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  makeStyles,
} from "@material-ui/core";

import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Box from "@mui/material/Box";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import { CursoCard } from "./CursoCard";
import { NavBar } from "../shared/NavBar";
import { Footer } from "../shared/Footer";
import { VistaReservas } from "./VistaReservas";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: "#f9f9f9",
      width: "100%",
      maxHeight: "100%",
      padding: theme.spacing(3),
    },
    root: {
      display: "flex",
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    active: {
      background: "#f4f4f4",
    },
    title: {
      padding: theme.spacing(2),
    },

    date: {
      flexGrow: 1,
    },
    toolbar: theme.mixins.toolbar,
  };
});

export function DashboardEstudiante() {
  const classes = useStyles();
  const history = useHistory();

  const cursos = [
    {
      nombre: "Tecnologias moviles",
      profesor: "Rodrigo Pavez",
      horario: "18:20-20:00",
    },
    {
      nombre: "Tecnologias web",
      profesor: "Rodrigo Pavez",
      horario: "18:20-20:00",
    },
    {
      nombre: "Sistemas distribuidos",
      profesor: "Rodrigo Pavez",
      horario: "18:20-20:00",
    },
    {
      nombre: "Sistemas operativos",
      profesor: "Rodrigo Pavez",
      horario: "18:20-20:00",
    },
  ];
  const [value, setValue] = React.useState("1");
  const [vista,setvista] = useState("profesores");
  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
  };
  function cambiarNombre(){
    cursos[0].nombre="curso extraño";
  }
  return (
    <Fragment>
      <NavBar/>
      <div className={classes.root}>
        {/* app bar */}
        {/* <AppBar
          position="fixed"
          className={classes.appBar}
          elevation={0}
          color="primary"
        >
          <Toolbar style={{ backgroundColor: "#303e4e" }}>
            <Typography className={classes.date}></Typography>
            <Button
              style={{ WebkitTextFillColor: "white" }}
              onClick={() => history.push("/")}
            >
              Cerrar Sesión
            </Button>
          </Toolbar>
        </AppBar> */}
        
        <div className={classes.page}>
          
          Bienvenido, usuario x
          <Button onClick={()=>cambiarNombre()}>Cambiar Nombre</Button>
          <Box
            sx={{ width: "100%", typography: "body1", paddingBlockEnd: "100%" }}
          >
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Cursos Disponibles" value="1" />
                  <Tab label="Reservas" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1" onClick={() => setvista("estudiantes")}>
                <Grid container>
                  {cursos.map((curso) => (
                    <CursoCard curso={curso}/>
                  ))}
                </Grid>
              </TabPanel>
              <TabPanel value="2" onClick={() => setvista("profesores")}>
                <Grid container>
                  <VistaReservas/>
                </Grid>
              </TabPanel>
              <TabPanel value="3">Encargados</TabPanel>
            </TabContext>
          </Box>
          <div className={classes.toolbar}></div>
        </div>
      </div>
      <Footer/>
    </Fragment>
  );
}
