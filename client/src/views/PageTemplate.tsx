import React, { useState, useEffect } from "react";
import LiveScoreBar from "../scores/LiveScoreBar";
import Navbar from "../sidebar/NavBar";
import { Grid } from "@mui/material";
import Footer from "../features/footer/Footer";
import { getWindowSize } from "../shared/utils";

interface PageTemplateProps {
  child: React.ReactNode;
  isHomePage: boolean;
}

const PageTemplate = ({ isHomePage, child }: PageTemplateProps) => {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(getWindowSize());
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  // device screen breakpoints for navbar and liveScoreBar
  const largeBreakPointsProps = {
    xs: 12,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 12,
  };

  return (
    <Grid
      container
      sx={{ backgroundColor: isHomePage ? "primary.light" : "" }}
      style={{
        position: "relative",
      }}
    >
      <Grid item {...largeBreakPointsProps}>
        <Navbar />
      </Grid>
      <Grid
        item
        {...largeBreakPointsProps}
        style={{
          margin: "3.5rem 0 1rem 0",
        }}
      >
        <LiveScoreBar />
      </Grid>

      <Grid
        item
        {...largeBreakPointsProps}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingRight:
            isHomePage && windowSize.innerWidth > 1000
              ? "10rem"
              : isHomePage && windowSize.innerWidth > 500
              ? "3rem"
              : "1rem",
          paddingLeft:
            isHomePage && windowSize.innerWidth > 1000
              ? "10rem"
              : isHomePage && windowSize.innerWidth > 500
              ? "3rem"
              : "1rem",
          backgroundColor: "primary.main",
          paddingBottom: "13rem",
        }}
      >
        {child}
      </Grid>
      <Grid
        item
        style={{
          width: "100%",
          position: "absolute",
          bottom: 0,
          height: "10rem",
        }}
      >
        <Footer />
      </Grid>
    </Grid>
  );
};

export default PageTemplate;
