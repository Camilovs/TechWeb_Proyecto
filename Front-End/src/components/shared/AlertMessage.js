import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from '@mui/material/Alert';

export default function AlertMassage({ message, severity = "warning", setState}) {
  const [open, setOpen] = React.useState(true);

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setState(false)
    setOpen(false);
  }
  // console.log('Alerta ', message, ' ',severity)
  return (
    <div>
    <Snackbar
        open={open} 
        autoHideDuration={3000}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
        }}  
        onClose={handleClose}>
        <Alert onClose={handleClose} action={[]} severity={severity} sx={{ width: '30vw' }}>
        {message}
        </Alert>
      </Snackbar>
      
    </div>
  );
}