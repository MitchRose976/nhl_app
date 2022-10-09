import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Stack, Button } from "@mui/material";
import Logo from "./components/Logo";
import HamburgerDropdown from "./components/HamburgerDropdown";
import { menuItems } from "../shared/constants";
import "./style.scss";

const Sidebar2 = () => {

  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  };

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

  const renderFullMenu = () => {
    return (
      <Stack
        direction="row"
        spacing={3}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {menuItems.map((menuItem) => (
          <Button color="inherit">{menuItem}</Button>
        ))}
      </Stack>
    );
  };

  return (
    <>
      <AppBar position="static" sx={{ zIndex: 10, border: "1px solid green" }}>
        <Toolbar sx={{ display: "grid", gridTemplateColumns: "1fr 5fr" }}>
          <Logo />
          {window.innerWidth > 790 ? renderFullMenu() : <HamburgerDropdown/>}
        </Toolbar>
      </AppBar>
      {console.log('mitch window: ', windowSize)}
    </>
  );
};

export default Sidebar2;
