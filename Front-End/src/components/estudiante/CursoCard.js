import { Button, Card, CardActions, CardContent, Grid, Typography } from '@material-ui/core'
import Box from "@mui/material/Box";
import React from 'react'
import { bloques } from '../../api/bloques';

export const CursoCard = ({curso}) => {

  // OBTENER CLASES APROBADAS (TRUE) DE ESTE MODULO curso._id,id

  return (
    <Grid item spacing={3} style={{ margin: "5px" }}>
      <Box sx={{ minWidth: 275, maxWidth: 200 }}>
        <Card variant="outlined">
          <React.Fragment>
            <CardContent>
              <Typography variant="h5" component="div">
                {curso.nombre}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {curso.profesor}
              </Typography>
              <Typography variant="body2">
                {curso.horario}
              </Typography>
              {/* LA o LAS CLASES DE CADA MODULO */}
              {/* {bloques[curso.horario_inicio - 1].hora_inicio} */}

            </CardContent>
            <CardActions>
              <Button size="small">Reservar</Button>
            </CardActions>
          </React.Fragment>
        </Card>
      </Box>
    </Grid>
  )
}
