import React, { createContext, useState, useMemo, useCallback } from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

export const SnackBarContext = createContext();

const SnackBarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState();
  const [severity, setSeverity] = useState('info');
  const [duration, setDuration] = useState(6000);

  const handleClose = () => {
    setOpen(false);
  };

  const addAlert = useCallback(({ content, customSeverity, customDuration }) => {
    setOpen(true);
    setAlert(content);
    if (customSeverity) setSeverity(customSeverity);
    if (customDuration) setDuration(customDuration);
  }, []);

  const value = useMemo(
    () => ({
      addAlert,
    }),
    [addAlert],
  );

  return (
    <SnackBarContext.Provider value={value}>
      <>
        {children}
        <Snackbar open={open} autoHideDuration={duration} onClose={handleClose}>
          <Alert severity={severity}>{alert}</Alert>
        </Snackbar>
      </>
    </SnackBarContext.Provider>
  );
};

export default SnackBarProvider;
