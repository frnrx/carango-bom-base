import React from 'react';
import { Container, CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import Routes from '../../routes';
import AuthenticationProvider from '../../contexts/authentication';
import SnackBarProvider from '../../contexts/snackbar';
import Layout from '../Layout';
import { useStyles, muiTheme } from './styles';

const App = () => {
  const classes = useStyles();

  return (
    <SnackBarProvider>
      <AuthenticationProvider>
        <ThemeProvider theme={muiTheme}>
          <div className={classes.root}>
            <CssBaseline />
            <main className={classes.content}>
              <Container component="article" maxWidth="md">
                <Layout>
                  <Routes />
                </Layout>
              </Container>
            </main>
          </div>
        </ThemeProvider>
      </AuthenticationProvider>
    </SnackBarProvider>
  );
};

export default App;
