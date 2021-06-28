import React from 'react';
import { Container, CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import Routes from '../../routes';
import useAuth from '../../hooks/useAuth';
import Authentication from '../../contexts/authentication';
import Layout from '../Layout';
import { useStyles, muiTheme } from './styles';

const App = () => {
  const classes = useStyles();
  const authState = useAuth();

  return (
    <Authentication.Provider value={authState}>
      <ThemeProvider theme={muiTheme}>
        <div className={classes.root}>
          <CssBaseline />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Container component="article" maxWidth="md">
              <Layout>
                <Routes />
              </Layout>
            </Container>
          </main>
        </div>
      </ThemeProvider>
    </Authentication.Provider>
  );
};

export default App;
