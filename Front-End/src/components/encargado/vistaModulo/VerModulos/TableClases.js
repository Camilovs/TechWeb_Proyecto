import React from 'react'
import styled from 'styled-components';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';

const StyledTableCell = styled(TableCell)`
  &&{
    background-color: #EEEEEE;
    color: black;
    font-weight:'bold';
    font-size:15;
  }
`
const ClasesDefecto = [
  {
    tipo:"Recurrente",
    sala:"Sala 21",
    horario:{
      inicio:{
        dia:"Martes",
        hora_inicio:"8:30"
      },
      fin:{
        dia:"Martes",
        hora_fin:"9:30"
      }
    }
  },
  {
    tipo:"Unica",
    sala:"Laboratorio 1",
    horario:{
      inicio:{
        dia:"Viernes",
        hora_inicio:"10:40"
      },
      fin:{
        dia:"Martes",
        hora_fin:"11:40"
      }
    }
  },
]
export const TableClases = ({id}) => {

  const data = ClasesDefecto
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
            className="fa fa-book-open" 
            style={{fontSize:17}}
            />
          </div>
          <div className="col  p-0">
            <h5 className="m-0">Clases Inscritas</h5>
          </div>
        </div>
      </div>
      <Paper sx={{ width: '100%', overflow: 'hidden', padding:"10px" }}>
        <TableContainer sx={{ maxHeight: '300px' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <StyledTableCell>
                  Tipo
                </StyledTableCell>
                <StyledTableCell>
                  Sala
                </StyledTableCell>
                <StyledTableCell>
                  Horario
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((clase, i) =>{
              return(
                <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                  <TableCell>
                    {clase.tipo}
                  </TableCell>
                  <TableCell>
                    {clase.sala}
                  </TableCell>
                  <TableCell>
                    {`${clase.horario.inicio.dia} 
                      ${clase.horario.inicio.hora_inicio} a ${clase.horario.fin.hora_fin}
                    `}
                  </TableCell>
                </TableRow>
              )
            })
            }
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5,10, 25, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  )
}
