import blue from '@material-ui/core/colors/blue';
import { ptBR } from '@material-ui/core/locale';
import { makeStyles } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';

export const muiTheme = createMuiTheme(
  {
    palette: {
      primary: {
        main: blue[900],
      },
    },
    props: {
      MuiLink: {
        underline: 'none',
      }
    },
    overrides: {
      MuiLink: {
        root: {
          color: 'inherit',
        }
      }
    }
  },
  ptBR,
);

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
  },
}));
