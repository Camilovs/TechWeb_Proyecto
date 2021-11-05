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

const defaultRows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];

/*
Tabla que muestra los datos con paginación incluida. Recibe los head, que 
son los titulos de la tabla y la data, que es un arreglo de objetos
que iran en cada fila de la tabla. Como ejemplos consultar "defaultHead" y
"defaultRows mas arriba."
*/
export const TablaCRUD = (
  { 
    head = defaultHead, 
    data = defaultRows,
    updateAccion,
    updateId,
    tipo = ''
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
  const handleDelete = item => {
    confirm(
      { 
        title:'Acción peligrosa',
        description: `¿Estás seguro de eliminar ${tipo} ${item}? Esta acción es 
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
      .then(() => console.log("Borrando item: ", item))
      .catch(() => console.log("Cancelado"));
  };
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: '45vh' }}>
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
                          id={row.id}
                          className="btn btn-custom-danger btn-sm" 
                          style={{marginRight:"3px"}}
                          onClick={() => handleDelete(row.nombre)}
                        >
                          <i id={row.id} className="fa fa-trash-alt"></i>
                        </button>

                        {/* Boton de Editar */}
                        <button 
                          id={row.id}
                          className="btn btn-custom-success btn-sm"
                          style={{marginRight:"3px"}}
                          onClick={()=> {
                            updateId(row.id)
                            updateAccion('editar')
                          }}
                        >
                          <i  id={row.id} className="fa fa-edit "></i>
                        </button>
                        
                        {/* Boton de Ver */}
                        <button  
                          id={row.id} 
                          className="btn btn-custom-primary btn-sm"
                          onClick={() => {
                            updateId(row.id)
                            updateAccion('ver')}}
                        >
                          <i  id={row.id} className="fa fa-eye "></i>
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
