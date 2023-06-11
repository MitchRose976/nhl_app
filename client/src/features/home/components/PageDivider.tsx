import React from "react";
import "../style.scss";
import { FaHockeyPuck } from "react-icons/fa";

const PageDivider = () => {
  return (
    <div className="page-divider-container">
      <div className="page-divider-hockey-stick"></div>
      <FaHockeyPuck color="#fff" size={"2rem"} style={{ margin: "0 1rem" }} />

      <div className="page-divider-hockey-stick"></div>
    </div>
  );
};

export default PageDivider;
