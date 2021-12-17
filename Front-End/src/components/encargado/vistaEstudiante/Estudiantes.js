import React, { Fragment, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@material-ui/core";
import EditIcon from "@mui/icons-material/Edit";
import { Box } from "@mui/system";
import { fetchConToken } from "../../../helpers/fetch";
import { styled } from '@mui/material/styles';
import { AddEstudiante } from "./AddEstudiante";
import { BorrarEstudiante } from "./BorrarEstudiante";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  
  backgroundColor: '#EEEEEE',
  color: theme.palette.common.black,
  fontWeight:'bold',
  fontSize:15

}));


export const Estudiantes = () => {
  const [alumnos, setAlumnos] = useState([])
  const [modalAdd, setModalAdd] = useState(false)
  const [reload, setReload] = useState(false)
  const [modalDel, setModalDel] = useState(false)
  const [idDel, setIdDel] = useState('')

  const reloading = () => {
    setReload(!reload)
  }
  

  useEffect(() => {
    
    async function fetch() {

      const query = await fetchConToken(
        `usuarios/estudiantes`,
        {},
        'GET'
      );
      const res = await query.json();
      console.log(res);
      setAlumnos(res.estudiantes);
    }
    fetch();
    
  }, [reload])

  return (
    <Fragment>
      {modalAdd && (
        <AddEstudiante 
          setModalAdd={setModalAdd}
          reload={reloading}
        />
      )}
      {modalDel && (
        <BorrarEstudiante
          id={idDel}
          setModalDel={setModalDel}
          reload={reloading}
        />
      )}
      <Box className="card" style={{ paddingBlockEnd: "10%",  }}>
        <div className="card-header">
          <h3 style={{ marginLeft: "20px", padding: "10px" }}>Estudiantes</h3>
        </div>
        <div className="container mt-5">
          <Button
            onClick={() => setModalAdd(true)}
            size="small"
            variant="contained"
            style={{ backgroundColor: "#303e4e", WebkitTextFillColor: "white" }}
          >
            Crear Estudiante
          </Button>
          <br />
          <br />
          <TableContainer component={Paper}>
            <Table stickyHeader sx={{ minWidth: 650 }} aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <StyledTableCell> Nombre</StyledTableCell>
                  <StyledTableCell> Correo</StyledTableCell>
                  <StyledTableCell align="right">Acción</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {alumnos.map((row) => (
                  <TableRow
                  hover
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
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={()=>{}}
                      >
                        <EditIcon  />
                      </Button>

                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => {
                          setIdDel(row._id)
                          setModalDel(true)
                        } }
                      >
                        <DeleteIcon  />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Box>
    </Fragment>
  );
};
