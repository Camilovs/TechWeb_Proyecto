import { Grid } from "@mui/material";
import React, { useState } from "react";

import { GestionEstudiantes } from "./GestionEstudiantes";
import { GestionProfesores } from "./GestionProfesores";
import Box from "@mui/material/Box";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
export const GestionUsuarios = () => {
  const [value, setValue] = React.useState("1");
  const [vista, setvista] = useState("profesores");
  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
  };

  return (
    <div
      style={{ flexGrow: 1, backgroundColor: "white", paddingBlockEnd: "100%" }}
    >
      <Grid item xs={12} sm={"100%"} md={"100%"} lg={"20%"} xl={"50%"}>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Estudiantes" value="1" />
                <Tab label="Profesores" value="2" />
                <Tab label="Encargados" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1" onClick={() => setvista("estudiantes")}>
              <GestionEstudiantes />
            </TabPanel>
            <TabPanel value="2" onClick={() => setvista("profesores")}>
              <GestionProfesores />
            </TabPanel>
            <TabPanel value="3">Encargados</TabPanel>
          </TabContext>
        </Box>
      </Grid>
    </div>
  );
};
