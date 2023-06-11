import { Paper, Typography } from "@mui/material";
import React from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { IconButton } from '@mui/material';

const Footer = () => {
  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "primary.main",
        color: "secondary.main",
        flexDirection: "column",
        borderRadius: 0,
        borderTop: '1rem solid #C60C30',
      }}
    >
      <Typography sx={{ marginTop: "1.5rem", fontSize: "1.6rem" }}>
        NHL Hub
      </Typography>
      <Typography sx={{opacity: '0.6'}}>Mitchell Rose</Typography>
      <Typography sx={{opacity: '0.6'}}>mitch.j.rose@outlook.com</Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginBottom: "1.5rem",
        }}
      >
        <IconButton
          aria-label="LinkedIN"
          onClick={() =>
            window.open(
              "https://www.linkedin.com/in/mitchell-rose-2733a9120/",
              "_blank"
            )
          }
          color='secondary'
          children={<LinkedInIcon />}
        />
        <IconButton
          aria-label="GitHub"
          onClick={() =>
            window.open("https://github.com/MitchRose976", "_blank")
          }
          color='secondary'
          children={<GitHubIcon />}
        />
      </div>
    </Paper>
  );
};

export default Footer;
