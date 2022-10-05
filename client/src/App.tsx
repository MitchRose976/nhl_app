import React from "react";
import Home from "./home/Home";
import Sidebar from "./sidebar/Sidebar";
import Sidebar2 from "./sidebar/Sidebar2";
import Grid from "@mui/material/Grid/Grid";
import Paper from "@mui/material/Paper/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import "./shared/colors.scss";

const theme = createTheme({
  palette: {
    primary: {
      main: "#34312D",
    },
  },
});

const App = () => {
  const navbarProps = {
    xs: 12,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 12,
    //style: {border: '1px solid blue'}
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container >
        <Grid item {...navbarProps}>
          <Sidebar2 />
        </Grid>
        
        {/* <Grid item style={{ border: "1px solid green" }}>
          <Home />
        </Grid> */}
      </Grid>
    </ThemeProvider>
  );
};

export default App;
