import React from "react";
import LiveScoreBar from "../scores/LiveScoreBar";
import Navbar from "../sidebar/NavBar";
import { Grid } from "@mui/material";

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
    <Grid container>
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
        }}
      >
        {child}
      </Grid>
    </Grid>
  );
};

export default PageTemplate;
