import React, { Fragment, useEffect, useState } from 'react'
import styled from 'styled-components';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { fetchConToken } from '../../../helpers/fetch';
import { bloques } from '../../../api/bloques';
import moment from 'moment';
import AlertMassage from '../../shared/AlertMessage';
moment().format()
const StyledTableCell = styled(TableCell)`
  &&{
    background-color: #EEEEEE;
    color: black;
    font-weight:'bold';
    font-size:15;
  }
`
// const ClasesDefecto = [
//   {
//     tipo:"Prueba",
//     sala:"Sala Prueba",
//     horario_inicio:1,
//     horario_fin:2,
//     horario_dia:'Hora Prueba',
//   },
// ]
export const TableClases = ({id,setAddClase}) => {

  const [data, setData] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [cantDelete, setCantDelete] = useState(false);
  const [borrado, setBorrado] = useState(false);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getDay = (dia) => {
    if(dia==='Lunes') {
      return 1
    }
    if(dia==='Martes') {
      return 2
    }
    if(dia==='Miercoles') {
      return 3
    }
    if(dia==='Jueves') {
      return 4
    }
    if(dia==='Viernes') {
      return 5
    }
    if(dia==='Sabado') {
      return 6
    }
    if(dia==='Domingo') {
      return 0
    }
  }
  

  const msToMinutos = (ms) => {
    let minutes = (ms / (1000 * 60)).toFixed(1);
    console.log('minutes',minutes)
    return minutes 
  }
  
  const borrarValido = (clase) => {

    const diaClase = getDay(clase.horario_dia);
    const horaClase = (bloques[clase.horario_inicio - 1].hora_inicio).split(':');
    const dateClase = moment()

    if(diaClase === dateClase.day()){
    // if(true){
      dateClase.add( diaClase - dateClase.day(), 'day' )
      dateClase.set(
        {
          'hour':parseInt(horaClase[0]), 
          'minute':parseInt(horaClase[1]),
          'seconds':0,
        }
      )
      const now = moment()
      // const test = moment().add(179,'m');
      // const diffDate = test.diff(now);
      const diffDate = dateClase.diff(now);
      const diffMin = parseFloat(msToMinutos(diffDate));
      console.log(diffMin)
      if(diffMin >= 180 || diffMin < 0){
        return true
      }
      else{
        return false
      }
    }
    return true;

  }
  
  const deleteClase = async(clase) => {
    const query = await fetchConToken(
      `clases/${clase._id}`,
      {},
      'DELETE'
    );
    const res = await query.json()
    return res;
  }
  

  const cancelarClase = async(clase) => {
    setBorrado(false)
    setCantDelete(false)
    console.log(borrarValido(clase))
    if(borrarValido(clase)){
      const res = await deleteClase(clase)
      console.log(res)
      setBorrado(true)
    }
    else{
      setCantDelete(true)
    }
  }
  

  useEffect( () => {
    
    async function fetchData(){
      const query = await fetchConToken(
        `clases/byModulo`,
        {modulo:id},
        'POST'
      );
      const res = await query.json();
      console.log('Clases: ',res.clases)
      if (res.clases.length>0){
        setData([...res.clases]) 
      }
    }
    fetchData()

  }, [borrado])

  return (
    <Fragment>
      {cantDelete && (
        <AlertMassage
          message={`
          No es posible eliminar la clase, debe ser con 3 horas
          de anticipación a la hora de inicio.
          `}
          severity='error'
          setState = {setCantDelete}
        />
      )}
      {borrado && (
        <AlertMassage
        message={`
          Clase Borrada con éxito!
        `}
        severity='success'
        setState = {setBorrado}
      />
      )}
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
                  <StyledTableCell>
                    Acción
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              
                {data.length > 0 ? (
                  <Fragment>
                    {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((clase, i) =>{
                      if(clase.aprobada){
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
                            <TableCell>
                              <button 
                                className="btn btn-custom-danger " 
                                onClick={() => cancelarClase(clase)}
                              >
                                <i className="fa fa-ban"></i>
                              </button>
                            </TableCell>
                          </TableRow>
                        )
                      }
                      else return (
                        <TableRow hover role="checkbox" tabIndex={-1}>
                          <TableCell colspan="4" >
                            Clase a la espera de aprobación...
                          </TableCell>
                        </TableRow>
                      )
                    })
                    }
                  </Fragment>
                ):(
                  <TableRow hover role="checkbox" tabIndex={-1}>
                    <TableCell colspan="4" >
                      Aún no hay clases registradas en este curso
                    </TableCell>
                  </TableRow>
                )}
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
    </Fragment>
  )
}
