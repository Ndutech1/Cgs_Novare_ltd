import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#F4F7FB",
      paper: "#FFFFFF"
    },
    primary: {
      main: "#2563EB",
      contrastText: "#FFFFFF"
    },
    secondary: {
      main: "#14B8A6",
      contrastText: "#052E2B"
    },
    divider: "rgba(37, 99, 235, 0.16)",
    text: {
      primary: "#0F172A",
      secondary: "#475569"
    }
  },
  typography: {
    fontFamily: '"Chakra Petch", "Rajdhani", "Inter", sans-serif',
    h1: { fontWeight: 700, letterSpacing: "0.02em" },
    h2: { fontWeight: 700, letterSpacing: "0.02em" },
    h3: { fontWeight: 600, letterSpacing: "0.01em" },
    h4: { fontWeight: 600, letterSpacing: "0.01em" },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" },
    subtitle1: {
      fontFamily: '"JetBrains Mono", "Space Mono", monospace',
      textTransform: "uppercase",
      letterSpacing: "0.08em"
    },
    caption: {
      fontFamily: '"JetBrains Mono", "Space Mono", monospace',
      textTransform: "uppercase",
      letterSpacing: "0.08em"
    },
    body2: {
      lineHeight: 1.7
    }
  },
  shape: {
    borderRadius: 12
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#F4F7FB",
          backgroundImage:
            "radial-gradient(circle at top left, rgba(37, 99, 235, 0.08), transparent 26%), linear-gradient(90deg, rgba(15, 23, 42, 0.03) 1px, transparent 1px), linear-gradient(rgba(15, 23, 42, 0.02) 1px, transparent 1px)",
          backgroundSize: "auto, 28px 28px, 28px 28px"
        },
        "*": {
          boxSizing: "border-box"
        },
        a: {
          color: "inherit",
          textDecoration: "none"
        }
      }
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: "lg"
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: "1px solid rgba(37, 99, 235, 0.14)",
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 18px 42px -16px rgba(15, 23, 42, 0.14)"
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: "1px solid rgba(37, 99, 235, 0.12)",
          background: "rgba(255, 255, 255, 0.88)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 16px 34px -18px rgba(15, 23, 42, 0.16)"
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          fontWeight: 700,
          boxShadow: "0 14px 28px -14px rgba(37, 99, 235, 0.28)",
          transition: "all 0.28s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 20px 36px -16px rgba(37, 99, 235, 0.3)"
          }
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)"
        },
        outlinedPrimary: {
          borderColor: "rgba(37, 99, 235, 0.24)",
          color: "#2563EB"
        },
        outlinedSecondary: {
          borderColor: "rgba(20, 184, 166, 0.24)",
          color: "#0F766E"
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "rgba(255, 255, 255, 0.82)",
          color: "#0F172A",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(37, 99, 235, 0.12)"
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 700,
          color: "#0F172A"
        },
        body: {
          color: "#475569"
        }
      }
    }
  }
});

export default theme;
