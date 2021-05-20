import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const wydGreen = {
  500: '#37662f',
  800: '#2a4d24',
};

const theme = createMuiTheme({
  palette: {
    background: {
      // dark: '#F4F6F8',
      dark: '#000000',
      default: colors.common.black,
      paper: colors.grey[800]
    },
    primary: {
      main: wydGreen[500],
    },
    secondary: {
      main: colors.indigo[500]
    },
    text: {
      // primary: colors.blueGrey[900],
      primary: colors.blueGrey[200],
      // secondary: colors.blueGrey[600]
      secondary: colors.blueGrey[50],
      anchor: wydGreen[500],
    }
  },
  shadows,
  typography
});

export default theme;
