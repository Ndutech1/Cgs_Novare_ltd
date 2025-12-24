import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0A4DA2" // professional blue
    },
    secondary: {
      main: "#3c6b3fff" // sustainability green
    }
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif"
  },
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: "lg"
      }
    }
  }
});

export default theme;

