import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import '../shared/style.scss'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Home = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: "10px",
      }}
      className='home-page'
    >
      <Grid
        container
        spacing={3}
        // direction="column"
        // alignItems="center"
        // justifyContent="center"
      >
        <Grid item xs={8} md={8}>
          <Item>
          </Item>
        </Grid>
        <Grid item xs={4} md={8}>
          <Item>Is</Item>
        </Grid>
        <Grid item xs={4} md={8}>
          <Item>Here</Item>
        </Grid>
        <Grid item xs={8} md={8}>
          <Item>Baby</Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
