import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import Logo from "./components/Logo";
import MenuIcon from "@mui/icons-material/Menu";
import { menuItems } from "../shared/constants";
import "./style.scss";

const Sidebar2 = () => {
    
  const expandHamburgerMenu = () => {
    return (
      <Stack direction="row" spacing={1}>
        {menuItems.map((menuItem) => (
          <Button color="inherit">{menuItem}</Button>
        ))}
      </Stack>
    );
  };

  const renderFullMenu = () => {
    return (
      <Stack direction="row" spacing={3}>
        {menuItems.map((menuItem) => (
          <Button color="inherit">{menuItem}</Button>
        ))}
      </Stack>
    );
  };

  const renderHamburgerMenu = () => {
    return (
      <IconButton
        size="large"
        color="inherit"
        aria-label="logo"
        className="hamburger-button"
      >
        <MenuIcon sx={{ fontSize: "2.3rem" }} />
      </IconButton>
    );
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Logo />
        {/* {renderFullMenu()} */}
        {renderHamburgerMenu()}
      </Toolbar>
    </AppBar>
  );
};

export default Sidebar2;
