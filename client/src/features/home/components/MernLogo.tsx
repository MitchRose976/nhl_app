import React, { useState } from "react";
import "../style.scss";
import { DiMongodb, DiReact, DiNodejs } from "react-icons/di";
import { SiExpress } from "react-icons/si";
import { Typography } from "@mui/material";

const MernLogo = () => {
  const [mHovered, setMHovered] = useState(false);
  const [eHovered, setEHovered] = useState(false);
  const [rHovered, setRHovered] = useState(false);
  const [nHovered, setNHovered] = useState(false);

  const handleHoverM = () => setMHovered(true);
  const handleLeaveM = () => setMHovered(false);

  const handleHoverE = () => setEHovered(true);
  const handleLeaveE = () => setEHovered(false);

  const handleHoverR = () => setRHovered(true);
  const handleLeaveR = () => setRHovered(false);

  const handleHoverN = () => setNHovered(true);
  const handleLeaveN = () => setNHovered(false);

  const extendedWordStyle = {
    marginRight: "0.7rem",
    fontSize: "1rem",
  };

  return (
    <div style={{ marginBottom: "2rem" }}>
      <div className="logo-container">
        <div
          className="logo-letter mongodb-letter"
          onMouseEnter={handleHoverM}
          onMouseLeave={handleLeaveM}
          style={{ width: `${mHovered ? "180px" : ""}` }}
        >
          <Typography
            style={{
              marginRight: `${mHovered ? "" : "0.7rem"}`,
              fontSize: "1.5rem",
            }}
          >
            M
          </Typography>
          {mHovered && (
            <Typography style={extendedWordStyle}>ongoDB</Typography>
          )}
          <DiMongodb className="icon" color="#589636" />
        </div>

        <div
          className="logo-letter express-letter"
          onMouseEnter={handleHoverE}
          onMouseLeave={handleLeaveE}
          style={{ width: `${eHovered ? "180px" : ""}` }}
        >
          <Typography
            style={{
              marginRight: `${eHovered ? "" : "0.7rem"}`,
              fontSize: "1.5rem",
            }}
          >
            E
          </Typography>
          {eHovered && (
            <Typography style={extendedWordStyle}>xpress</Typography>
          )}
          <SiExpress
            className="icon"
            color={`${eHovered ? "#141414" : "#fff"}`}
          />
        </div>

        <div
          className="logo-letter react-letter"
          onMouseEnter={handleHoverR}
          onMouseLeave={handleLeaveR}
          style={{ width: `${rHovered ? "180px" : ""}` }}
        >
          <Typography
            style={{
              marginRight: `${rHovered ? "" : "0.7rem"}`,
              fontSize: "1.5rem",
            }}
          >
            R
          </Typography>
          {rHovered && <Typography style={extendedWordStyle}>eact</Typography>}
          <DiReact className="icon" color="#61dafb" />
        </div>

        <div
          className="logo-letter node-letter"
          onMouseEnter={handleHoverN}
          onMouseLeave={handleLeaveN}
          style={{ width: `${nHovered ? "180px" : ""}` }}
        >
          <Typography
            style={{
              marginRight: `${nHovered ? "" : "0.7rem"}`,
              fontSize: "1.5rem",
            }}
          >
            N
          </Typography>
          {nHovered && <Typography style={extendedWordStyle}>odeJS</Typography>}
          <DiNodejs className="icon" color="#43853d" />
        </div>
      </div>
    </div>
  );
};

export default MernLogo;
