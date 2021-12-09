import { Grid } from "@mui/material";
import React, { useState } from "react";

import { GestionAdministradores } from "./GestionAdministradores";
import { GestionEncargados } from "./GestionEncargados";
import Box from "@mui/material/Box";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
export const GestionUsuarios = () => {
  const [value, setValue] = React.useState("1");
  const [vista, setvista] = useState("encargados");
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
                <Tab label="Encargados" value="1" />
                <Tab label="Administradores" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1" onClick={() => setvista("encargados")}>
              <GestionEncargados />
            </TabPanel>
            <TabPanel value="2" onClick={() => setvista("administradores")}>
              <GestionAdministradores />
            </TabPanel>
            <TabPanel value="3">Encargados</TabPanel>
          </TabContext>
        </Box>
      </Grid>
    </div>
  );
};
