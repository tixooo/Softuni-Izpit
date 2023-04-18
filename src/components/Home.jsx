import { useNavigate } from "react-router-dom";
import { Button, CssBaseline, Box, Typography, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

// TODO add the information for the home page
export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="s">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Easy warehouse manager
            </Typography>
            <br />
            <Typography component="p">
              Easy warehouse manager is a web application that helps you manage
              your warehouse.
            </Typography>
            <span>
              If you already have an account{" "}
              <Button
                onClick={() => navigate("/signIn")}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </span>
            <span>
              If you don't have an account{" "}
              <Button
                onClick={() => navigate("/signUp")}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            </span>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
