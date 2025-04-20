import { useState, useEffect } from "react";
import { AppBar, Toolbar, Stack, Button } from "@mui/material";
import Logo from "./components/Logo";
import HamburgerDropdown from "./components/HamburgerDropdown";
import { menuItems } from "../shared/constants";
import "./style.scss";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
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

  const FullMenu = () => {
    return (
      <Stack
        direction="row"
        spacing={2.5}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {menuItems.map((menuItem) => (
          <Button
            key={menuItem.label}
            color="inherit"
            onClick={() => navigate(menuItem.path)}
          >
            {menuItem.label}
          </Button>
        ))}
      </Stack>
    );
  };

  return (
    <AppBar>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Logo />
        {windowSize.innerWidth > 790 ? <FullMenu /> : <HamburgerDropdown />}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
