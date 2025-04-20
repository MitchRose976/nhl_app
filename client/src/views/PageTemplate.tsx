import React, { useState, useEffect } from "react";
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
  const [isScoreBarOpen, setIsScoreBarOpen] = useState(true);

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
      sx={{
        backgroundColor: isHomePage ? "primary.light" : "",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Grid item {...largeBreakPointsProps}>
        <Navbar onScoreBarToggle={setIsScoreBarOpen} />
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
          flex: 1,
          paddingBottom: "3rem",
          paddingTop: "2rem",
          marginTop: isScoreBarOpen ? "21rem" : "6rem",
          transition: "margin-top 0.3s ease-in-out", // Smooth transition
        }}
      >
        {child}
      </Grid>
      <Grid
        item
        style={{
          width: "100%",
          height: "10rem",
        }}
      >
        <Footer />
      </Grid>
    </Grid>
  );
};

export default PageTemplate;
