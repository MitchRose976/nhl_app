import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import MenuIcon from "@mui/icons-material/Menu";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { menuItems } from "../../shared/constants";
import { useTheme } from "@mui/material/styles";
import "../style.scss";
import { useNavigate } from "react-router-dom";

const HamburgerDropdown = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
    setOpen(false);
    navigate(menuItems[index].path);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpen(false);
  };

  const popperProps = {
    sx: {
      zIndex: 9999,
      width: "100%",
    },
    open: open,
    anchorEl: anchorRef.current,
    role: undefined,
  };

  const menuListProps = {
    id: "split-button-menu",
    sx: {
      display: "block",
      width: "100%",
      marginTop: "10px",
    },
  };

  const menuItemProps = {
    sx: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };

  return (
    <div
      style={{
        placeContent: "end",
        marginRight: "1rem",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="split button"
        sx={{ boxShadow: "none" }}
      >
        <Button
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select page"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <MenuIcon />
        </Button>
      </ButtonGroup>
      <Popper {...popperProps} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper
              sx={{
                width: "100%",
                marginTop: "5px",
                backgroundColor: theme.palette.primary.main,
                opacity: "0.8",
                color: "white",
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList {...menuListProps} autoFocusItem>
                  {menuItems.map((option, index) => (
                    <MenuItem
                      key={option.label}
                      {...menuItemProps}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default HamburgerDropdown;
