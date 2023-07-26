import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Alert, Slide } from '@mui/material';

const CustomSnackbar = ({ open, message,type, onClose }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      autoHideDuration={4000}
      onClose={onClose}
      >
         <Alert onClose={onClose} severity={type} sx={{ width: '100%' }}>
         {message}
        </Alert>
      </Snackbar>
  );
};

export default CustomSnackbar;
