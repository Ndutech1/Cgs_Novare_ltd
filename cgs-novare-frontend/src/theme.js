import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#f7f9fc",
      paper: "#ffffff"
    },
    primary: {
      main: "#0b5cab",
    },
    secondary: {
      main: "#0e8c75"
    },
    text: {
      primary: "#15253d",
      secondary: "#62728a"
    }
  },
  typography: {
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
    h1: { fontWeight: 800, letterSpacing: "-0.04em" },
    h2: { fontWeight: 800, letterSpacing: "-0.035em" },
    h3: { fontWeight: 750, letterSpacing: "-0.03em" },
    h4: { fontWeight: 750, letterSpacing: "-0.02em" }
  },
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: "lg"
      }
    },
    MuiButton: { styleOverrides: { root: { borderRadius: 10, textTransform: "none", fontWeight: 700 } } },
    MuiCard: { styleOverrides: { root: { borderRadius: 16, boxShadow: "0 10px 32px rgba(20, 52, 88, .08)" } } }
  }
});

export default theme;
