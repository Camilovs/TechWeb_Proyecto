import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { fetchConToken } from '../../../helpers/fetch';
import { bloques } from '../../../api/bloques';

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
    tipo:"Prueba",
    sala:"Sala Prueba",
    horario_inicio:1,
    horario_fin:2,
    horario_dia:'Hora Prueba',

  },
]
export const TableClases = ({id,setAddClase}) => {

  const [data, setData] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect( async() => {
    const query = await fetchConToken(
      `clases/byModulo`,
      {modulo:id},
      'POST'
    );
    const res = await query.json();
    console.log('Clases: ',res.clases)
    if (res.clases.length==0)
      setData(ClasesDefecto) 
    else setData([...res.clases])
  }, [])

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
            <h5 className="m-0">Clases</h5>
          </div>
        </div>
      </div>
      <div className='row' style={{padding:'10px'}}>
        <div className="col-auto">
          <button className="btn btn-custom-primary" 
            onClick={()=>setAddClase(true)}
          >
            <i className="fa fa-plus" style={{marginRight:"10px"}}></i>
            Agregar
          </button>
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
                    {clase.salaNombre}
                  </TableCell>
                  <TableCell>
                    {`${clase.horario_dia} 
                      ${bloques[clase.horario_inicio - 1].hora_inicio} a 
                      ${bloques[clase.horario_fin - 1].hora_fin}
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
