import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Alert from '@mui/material/Alert';

export default function AlertMassage({ message }) {
  const [open, setOpen] = React.useState(true);
  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  }

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
              
        <Alert onClose={handleClose} action={[]} severity="warning" sx={{ width: '100%' }}>
        {message}
        </Alert>
      </Snackbar>
      
    </div>
  );
}