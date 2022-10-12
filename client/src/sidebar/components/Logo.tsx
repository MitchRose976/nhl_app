import { IconButton, Typography } from "@mui/material";
import SportsHockeyIcon from "@mui/icons-material/SportsHockey";

const Logo = () => {
  
  return (
    <div className="navbar-logo">
      <IconButton size="large" edge="start" color="inherit" aria-label="logo">
        <SportsHockeyIcon />
      </IconButton>
      <Typography variant="h6" component="div" sx={{ flexgrow: 1 }}>
        NHL App
      </Typography>
    </div>
  );
};

export default Logo;
