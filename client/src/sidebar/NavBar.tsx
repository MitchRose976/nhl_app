import { useState, useEffect } from "react";
import { AppBar, Toolbar, Stack, Button, IconButton, Collapse } from "@mui/material";
import Logo from "./components/Logo";
import HamburgerDropdown from "./components/HamburgerDropdown";
import { menuItems } from "../shared/constants";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import LiveScoreBar from "../scores/LiveScoreBar";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface NavBarProps {
  onScoreBarToggle?: (isOpen: boolean) => void;
}

const Navbar = ({ onScoreBarToggle }: NavBarProps) => {
  const navigate = useNavigate();
  const [isScoreBarOpen, setIsScoreBarOpen] = useState(true);
  
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

  const handleScoreBarToggle = () => {
    const newState = !isScoreBarOpen;
    setIsScoreBarOpen(newState);
    onScoreBarToggle?.(newState);
  };

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
      <Collapse in={isScoreBarOpen}>
        <LiveScoreBar />
      </Collapse>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        backgroundColor: '#141414',
        borderBottom: "1rem solid #c60c30",
      }}>
        <IconButton 
          onClick={handleScoreBarToggle}
          sx={{ 
            color: 'white',
            padding: '0.5rem',
          }}
        >
          {isScoreBarOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </div>
    </AppBar>
  );
};

export default Navbar;
