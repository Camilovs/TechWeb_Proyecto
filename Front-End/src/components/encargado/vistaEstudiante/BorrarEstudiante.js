import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { Button } from "@material-ui/core";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import { fetchConToken } from "../../../helpers/fetch";
import AlertMassage from "../../shared/AlertMessage";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),

    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "300px",
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export const BorrarEstudiante = ({setModalDel, id, reload}) => {

  const classes = useStyles();
  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState('');
  const [eliminado, setEliminado] = useState(false)
  
  const borrarEstudiante = async(id,e) => {

    e.preventDefault()
    console.log(id)
    const query = await fetchConToken(
      `usuarios/${id}`,
      {},
      'DELETE'
    );
    const res = await query.json();
    console.log(res);
    if(res.ok){
      setEliminado(true)
      setModalDel(false)
      reload()
    }
    else{
      setError(true)
      if(res.errors){
        setMsgError('Hubo un error, consulta con tu administrador')
      }
      else{
        setMsgError(res.msg)
        
      }
    }
  }

  return (
    <Fragment>

      {error && (
        <AlertMassage
          message={msgError}
          severity='error'
          setState={setError}
        />
      )} 
      {eliminado && (
        <AlertMassage
          message='Alumno eliminado con éxito!'
          severity='success'
          setState={setEliminado}
        />
      )} 

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={true}
        onClose={()=>setModalDel(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={true}>
          <Box sx={style}>    
            <form className={classes.root} onSubmit={(e) => borrarEstudiante(id,e)}>
              ¿Seguro que quieres eliminar a este estudiante?
              <div>
                <Button variant="contained">Cancelar</Button>
                <Button
                  type="submit"
                  variant="contained"
                  style={{ backgroundColor: "#303e4e", WebkitTextFillColor: "white" }}
                >
                  Eliminar
                </Button>
              </div>
            </form>
            </Box>
        </Fade>
      </Modal>
      
    </Fragment>
  )
}
