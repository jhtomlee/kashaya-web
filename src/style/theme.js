import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00CC66',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
    // text:{
    //   secondary: rgba(255, 255, 255, 0.7)
    // }
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      'Muli',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontFamily: ['Saira Extra Condensed', '-apple-system', 'Roboto'].join(
        ','
      ),
      fontWeight: 700,
    },
    h2: {
      fontFamily: ['Saira Extra Condensed', '-apple-system', 'Roboto'].join(
        ','
      ),
      fontWeight: 700,
    },
    h5: {
      fontFamily: ['Saira Extra Condensed', '-apple-system', 'Roboto'].join(
        ','
      ),
    },
    h6: {
      fontFamily: ['Saira Extra Condensed', '-apple-system', 'Roboto'].join(
        ','
      ),
    },
  },
});

export default theme;
