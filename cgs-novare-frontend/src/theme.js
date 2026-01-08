import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#050505",   // thick black
      paper: "#0b0b0b"
    },
    primary: {
      main: "#0A4DA2"
    },
    secondary: {
      main: "#3c6b3f"
    },
    text: {
      primary: "#ffffff",
      secondary: "rgba(255,255,255,0.7)"
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
