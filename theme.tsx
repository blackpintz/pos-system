import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    background: {
      default: '#fffff0',
    },

  },
  overrides: {
    MuiDialog: {
      paper: {
        margin: "12px",
        minWidth: "250px"
      }
    }
  }
});

export default theme;
