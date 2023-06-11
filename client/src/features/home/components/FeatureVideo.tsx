import { Typography } from "@mui/material";
import React from "react";

interface FeatureVideoProps {
  videoSrc: string;
  windowWidth: number;
  featureDescription: string;
  featureTitle: string;
}

const FeatureVideo = ({
  videoSrc,
  windowWidth,
  featureDescription,
  featureTitle,
}: FeatureVideoProps) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          width: windowWidth < 500 ? "100%" : "45%",
          height: "100%",
          marginTop: windowWidth < 500 ? "2rem" : "",
        }}
      >
        <Typography sx={{ fontSize: "1.3rem" }}>{featureTitle}</Typography>
        <p style={{ fontSize: "1rem" }}>{featureDescription}</p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: windowWidth < 500 ? "100%" : "45%",
          height: "100%",
          marginTop: windowWidth < 500 ? "2rem" : "",
          //border: "1px solid red",
        }}
      >
        <video style={{ width: "100%", height: "100%" }} controls autoPlay loop>
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>
    </>
  );
};

export default FeatureVideo;
