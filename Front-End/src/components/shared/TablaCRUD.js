import React from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { useConfirm } from "material-ui-confirm";
import { fetchConToken } from '../../helpers/fetch';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  
    // backgroundColor: '#CADBF1',
    // backgroundColor: '#DDDDDD',
    backgroundColor: '#EEEEEE',
    color: theme.palette.common.black,
    fontWeight:'bold',
    fontSize:15
  
}));

const defaultHead = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}


/*
Tabla que muestra los datos con paginación incluida. Recibe los head, que 
son los titulos de la tabla y la data, que es un arreglo de objetos
que iran en cada fila de la tabla. Como ejemplos consultar "defaultHead" y
"defaultRows mas arriba."
*/
export const TablaCRUD = (
  { 
    head = defaultHead, 
    data = {},
    updateAccion,
    updateId,
    tipo = '',
    funcionDelete
  }
  ) => {

  const confirm = useConfirm();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleDelete = (item,e) => {
    confirm(
      { 
        title:'Acción peligrosa',
        description: `¿Estás seguro de eliminar ${tipo}: ${item}? Esta acción es 
        irreversible.`,
        confirmationText:'Borrar',
        confirmationButtonProps:{
          color:'error',
          variant:'outlined'
        },
        cancellationText:'Cancelar',
        contentProps:{
          // dividers:true
        },
        titleProps:{
        }
      }
    )
      .then(() => {
        funcionDelete(e.target.id)
      })
      .catch(() => console.log("Cancelado"));
  };
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer >
        <Table stickyHeader aria-label="sticky table">
          {/* Titulos de la tabla */}
          <TableHead >
            <TableRow>
              {/* Recorrer los titulos para agregarlos al TableHead */}
              {head.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
              {/* Head de Acciones */}
              <StyledTableCell width={150}>
                Acción
              </StyledTableCell>
            </TableRow>
          </TableHead>
          {/* Cuerpo de la Tabla */}
          <TableBody>
            {/* Recorremos y dividimos el arreglo de datos, para la cantidad de filas  
            segun la paginación actual.
            */}
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {/* Se recorren los titulos para agregar un dato correspondiente
                    a ese titulo en un TableCell  */}
                    {head.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                    {/* Botones de Accion */}
                    <TableCell>
                        {/* Boton de Eliminar */}
                        <button 
                          id={row._id}
                          className="btn btn-custom-danger btn-sm" 
                          style={{marginRight:"3px"}}
                          onClick={(e) => handleDelete(row.nombre, e)}
                        >
                          <i id={row._id} className="fa fa-trash-alt"></i>
                        </button>

                        {/* Boton de Editar */}
                        <button 
                          id={row._id}
                          className="btn btn-custom-success btn-sm"
                          style={{marginRight:"3px"}}
                          onClick={()=> {
                            updateId(row._id)
                            updateAccion('editar')
                          }}
                        >
                          <i  id={row._id} className="fa fa-edit "></i>
                        </button>
                        
                        {/* Boton de Ver */}
                        <button  
                          id={row._id} 
                          className="btn btn-custom-primary btn-sm"
                          onClick={() => {
                            updateId(row._id)
                            updateAccion('ver')}}
                        >
                          <i  id={row._id} className="fa fa-eye "></i>
                        </button>

                    </TableCell>
                  </TableRow>
                );
              })}
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
  )
}
