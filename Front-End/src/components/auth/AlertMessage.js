import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from '@mui/material/Alert';

export default function AlertMassage({ message, severity = "warning"}) {
  const [open, setOpen] = React.useState(true);

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  }
  // console.log('Alerta ', message, ' ',severity)
  return (
    <div>
    <Snackbar
        open={open} 
        autoHideDuration={5000}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
        }}  
        onClose={handleClose}>
              
        <Alert onClose={handleClose} action={[]} severity={severity} sx={{ width: '100%' }}>
        {message}
        </Alert>
      </Snackbar>
      
    </div>
  );
}