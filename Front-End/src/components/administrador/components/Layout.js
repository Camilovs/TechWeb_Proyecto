import React from "react";
import { Button, makeStyles } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import GroupIcon from "@mui/icons-material/Group";
import ClassIcon from "@mui/icons-material/Class";
import EditAttributesIcon from "@mui/icons-material/EditAttributes";
import SchoolIcon from "@mui/icons-material/School";

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
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    date: {
      flexGrow: 1,
    },
    toolbar: theme.mixins.toolbar,
  };
});

export default function Layout({ children, funcionVista }) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <AppBar
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
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
        anchor="left"
      >
        <div>
          <Typography variant="h5" className={classes.title}>
            MeAnoto!
          </Typography>
        </div>

        <List>
          <ListItem button onClick={() => funcionVista("GestionUsuarios")}>
            <ListItemIcon>{<GroupIcon />}</ListItemIcon>
            <ListItemText primary={"Gestion Usuarios"} />
          </ListItem>
          <ListItem button onClick={() => funcionVista("Salas")}>
            <ListItemIcon>{<ClassIcon />}</ListItemIcon>
            <ListItemText primary={"Salas"} />
          </ListItem>
          <ListItem button onClick={() => funcionVista("Modulos")}>
            <ListItemIcon>{<SchoolIcon />}</ListItemIcon>
            <ListItemText primary={"Modulos"} />
          </ListItem>
          <ListItem button onClick={() => funcionVista("Plantillas")}>
            <ListItemIcon>{<EditAttributesIcon />}</ListItemIcon>

            <ListItemText primary={"Plantillas"} />
          </ListItem>
        </List>
      </Drawer>

      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
}
