import React, {Fragment} from 'react'
import styled, { createGlobalStyle } from 'styled-components';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';

const StyledTableCell = styled(TableCell)`
  &&{
    background-color: #EEEEEE;
    color: black;
    font-weight:'bold';
    font-size:15;
  }
`

export const TableAlumnos = ({id, inscritos}) => {

  console.log('inscritos ',inscritos);
  // Esto no es necesario cuando inscritos viene vacio, 
  // console.log('inscritos:', inscritos);
  // let data = inscritos

  // if (inscritos.length==0){
  //   data = SinAlumnos
  // }
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="card">
      <div className="card-header p-3">
        <div className="row align-items-center">
          <div className="col-auto">
            <i 
            className="fa fa-users" 
            style={{fontSize:17}}
            />
          </div>
          <div className="col  p-0">
            <h5 className="m-0">Alumnos Inscritos</h5>
          </div>
        </div>
      </div>
      <Paper sx={{ width: '100%', overflow: 'hidden', padding:"10px" }}>
        <TableContainer sx={{ maxHeight: '45vh' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <StyledTableCell>
                  Nombre
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inscritos.length > 0 ? (
                <Fragment>
                  {inscritos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((alumno, i) =>{
                    return(
                      <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                        <TableCell>
                          {alumno.nombre}
                        </TableCell>
                      </TableRow>
                    )
                  })
                  }
                </Fragment>
              ):(
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell>
                    Aún no hay alumnos registrados en este curso
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5,10, 25, 100]}
          component="div"
          count={inscritos.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  )
}
