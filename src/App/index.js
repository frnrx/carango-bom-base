import React from 'react';
import { Container, CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import Routes from '../routes';
import { useStyles, muiTheme } from './styles';

const App = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={muiTheme}>
      <div className={classes.root}>
        <CssBaseline />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Container component="article" maxWidth="md">
            <Routes />
          </Container>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default App;
