import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Top10Chart from "./features/top10Chart/Top10Chart";
import { colors } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageTemplate from "./views/PageTemplate";
import StandingsChart from "./features/standingsChart/StandingsChart";
import HomePage from "./features/home/HomePage";
import TeamStats from "./features/teamStats/TeamStats";

/*
  dark-grey: #141414
  red-line-red: #c60c30
  dark-blue: #1B486A
*/
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
      light: "#141414",
      // dark: '#',
      // contrastText: '#',
    },
    secondary: {
      main: "#fff",
      // light: '',
      dark: "#F4F5F4",
      // contrastText: '',
    },
    success: {
      main: colors.blue[500],
    },
  },
});

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route
            path="/"
            element={<PageTemplate isHomePage={true} child={<HomePage />} />}
          />
          <Route
            path="/standings"
            element={
              <PageTemplate isHomePage={false} child={<StandingsChart />} />
            }
          />
          <Route
            path="/playerStats"
            element={<PageTemplate isHomePage={false} child={<Top10Chart />} />}
          />
          <Route
            path="/teamStats"
            element={<PageTemplate isHomePage={false} child={<TeamStats />} />}
          />
          <Route />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
