import React from "react";
import LiveScoreBar from "../scores/LiveScoreBar";
import Navbar from "../sidebar/NavBar";
import { Grid } from "@mui/material";
import Footer from "../features/footer/Footer";

interface PageTemplateProps {
  child: React.ReactNode;
}

const PageTemplate = ({ child }: PageTemplateProps) => {
  // device screen breakpoints for navbar and liveScoreBar
  const largeBreakPointsProps = {
    xs: 12,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 12,
  };

  return (
    <Grid container style={{position: 'relative'}}>
      <Grid item {...largeBreakPointsProps}>
        <Navbar />
      </Grid>
      <Grid item {...largeBreakPointsProps} style={{ marginBottom: "2rem" }}>
        <LiveScoreBar />
      </Grid>

      <Grid
        item
        {...largeBreakPointsProps}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid blue",
          padding: "1rem",
          backgroundColor: 'primary.main',
          paddingBottom: '13rem'
        }}
      >
        {child}
      </Grid>
      <Grid item style={{width: '100%', position: 'absolute', bottom: 0, height: '10rem'}}>
        <Footer/>
      </Grid>
    </Grid>
  );
};

export default PageTemplate;
