import React, { Fragment, useEffect, useState } from "react";
import {
  Button,
  Grid,
  makeStyles,
} from "@material-ui/core";

import { useHistory } from "react-router-dom";

import Box from "@mui/material/Box";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import { CursoCard } from "./CursoCard";
import { NavBar } from "../shared/NavBar";
import { Footer } from "../shared/Footer";
import { VistaReservas } from "./VistaReservas";
import { revisarToken } from "../shared/validarUsuario";
import { fetchConToken } from "../../helpers/fetch";
import { Loading } from "../shared/Loading";

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
      // backgroundColor: "#e4e4e4"
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
  const [loading, setLoading] = useState(true);
  const [cursosAlumno, setCursosAlumno] = useState([]);
  const [nombreUsuario, setnombreUsuario] = useState("");
  useEffect(async () => {
    //Es necesario recargar la página para que algunos íconos se rendericen correctamente
    if (!window.location.hash) {
      window.location = window.location + "#loaded";
      window.location.reload();
    }
    const id = localStorage.getItem("uid");

    const query = await fetchConToken(`usuarios/${id}`, {}, "GET");
    const res = await query.json();
    setnombreUsuario(res.usuario.nombre);
    console.log(res.usuario.modulos);
    setCursosAlumno(res.usuario.modulos);
    console.log(cursosAlumno);
    setLoading(false);
  }, []);

  const classes = useStyles();
  const history = useHistory();

  const cursosDefault = [
    {
      nombre: "Tecnologias moviles",
      profesor: "Rodrigo Pavez",
      horario_inicio: 3,
      horario_fin: 4,
      horario_dia: "Lunes",
    },
    {
      nombre: "Tecnologias web",
      profesor: "Rodrigo Pavez",
      horario_inicio: 5,
      horario_fin: 6,
      horario_dia: "Martes",
    },
    {
      nombre: "Sistemas distribuidos",
      profesor: "Rodrigo Pavez",
      horario_inicio: 7,
      horario_fin: 8,
      horario_dia: "Sábado",
    },
    {
      nombre: "Sistemas operativos",
      profesor: "Rodrigo Pavez",
      horario_inicio: 1,
      horario_fin: 2,
      horario_dia: "Miércoles",
    },
  ];
  const [value, setValue] = React.useState("1");
  const [vista, setvista] = useState("profesores");
  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
  };
  function cambiarNombre(){
    cursos[0].nombre="curso extraño";
  }
  const redirectToOut = () => {
    console.log('redirectout')
    history.push('/')
  }
  
  useEffect(() => {
    async function waitValidate(){

      if(! await revisarToken('Estudiante')){
        redirectToOut()
      }
    }
    waitValidate()
    // revisarToken()
  }, [])
  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <NavBar />
          <div className={classes.root}>
            <div className={classes.page}>
              <div className="container">
                Bienvenido, usuario {nombreUsuario}
                <Box
                  sx={{
                    width: "100%",
                    typography: "body1",
                    paddingBlockEnd: "100%",
                  }}
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
                        {/* ELIAS ACA FILTER Y MAP POR UID LocalStorage.getItem('uid') */}
                        {/* {usuarios.filter('por id').map('x modulo') {
                        <CursoCard curso={curso}/>
                      }} */}

                        {cursosAlumno.map((curso) => (
                          <CursoCard curso={curso} />
                        ))}
                      </Grid>
                    </TabPanel>
                    <TabPanel value="2" onClick={() => setvista("profesores")}>
                      <Grid container>
                        <VistaReservas />
                      </Grid>
                    </TabPanel>
                    <TabPanel value="3">Encargados</TabPanel>
                  </TabContext>
                </Box>
                <div className={classes.toolbar}></div>
              </div>
            </div>
          </div>
          <Footer />
        </Fragment>
      )}
    </Fragment>
  );
}
