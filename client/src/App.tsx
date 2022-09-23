import React from "react";
import Sidebar from "./sidebar/Sidebar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import './shared/colors.scss';

const theme = createTheme({
  palette: {
    primary: {
      main: '#34312D',
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div style={{ textAlign: "center" }}>
        <h1>Mitch</h1>
        <Sidebar />
      </div>
    </ThemeProvider>
  );
};

export default App;
