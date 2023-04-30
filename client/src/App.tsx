import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Top10Chart from "./features/top10Chart/Top10Chart";
import { colors } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageTemplate from "./views/PageTemplate";
import StandingsChart from "./features/standingsChart/StandingsChart";

// black: '#090A0B',
// Eerie Black: '#141414'
// Smoky Black: '#12100E'
// Powder Blue: '#ACDDE7'
// Middle Blue Green: '#9AD5CA'
// Cerulean Crayola: '#06AED5'
// Powder Blue: #92AFD7
const theme = createTheme({
  custom: {
    blue: colors.blue[800],
    lightBlue: colors.blue[400],
    red: colors.red[800],
    lightRed: colors.red[400],
  },
  palette: {
    primary: {
      main: "#090A0B",
      // light: '#',
      // dark: '#',
      // contrastText: '#',
    },
    secondary: {
      main: "#fff",
      // light: '',
      // dark: '',
      // contrastText: '',
    },
  },
});

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<PageTemplate child={<h1>Hello</h1>} />} />
          <Route path="/standings" element={<PageTemplate child={<StandingsChart/>} />} />
          <Route
            path="/playerStats"
            element={<PageTemplate child={<Top10Chart />} />}
          />
          
          <Route/>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
