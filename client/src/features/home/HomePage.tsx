import React, { CSSProperties, useEffect, useState } from "react";
import { getWindowSize } from "../../shared/utils";
import "./style.scss";
import PageDivider from "./components/PageDivider";
import MernLogo from "./components/MernLogo";
import NHL_Hub_Head_to_Head from "../../shared/assets/NHL_Hub_Head_to_Head.mp4";
import NHL_Hub_Live_Stats from "../../shared/assets/NHL_Hub_Live_Stats.mp4";
import FeatureVideo from "./components/FeatureVideo";

const HomePage = () => {
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

  const featureItems = [
    {
      title: "Head-to-Head Stats",
      src: NHL_Hub_Head_to_Head,
      description:
        "See head-to-head stats and view in-depth team analysis for todays games and gain valuable insights into team performance before the puck drops.",
    },
    {
      title: "Live Game Stats",
      src: NHL_Hub_Live_Stats,
      description:
        "Track live game stats and goals. Stay updated on shots, faceoff wins, penalties more. Get real-time goal scoring details, including player names, goal times, and assists. Never miss a moment with accurate and comprehensive data.",
    },
  ];

  const featureSectionDivProps: CSSProperties = {
    marginTop: "2rem",
    display: "flex",
    flexDirection: `${windowSize.innerWidth < 1400 ? "column" : "row"}`,
    justifyContent: "space-around",
    alignItems: "center",
  };

  return (
    <>
      <div className="welcome-message">
        {/* Section One */}
        <header className="welcome-message-header">
          <h1>NHL Statistics Web App</h1>
          <p className="fade-in">
            Introducing our NHL Stats Tracker web app! It's your one-stop hub
            for team, player, and live game statistics. Stay up-to-date with
            comprehensive team performance insights, track individual player
            achievements, and experience the thrill of real-time updates during
            live games. Discover the fascinating world of NHL stats today!
          </p>
        </header>
        <PageDivider />

        {/* THE TECH */}
        <div className="welcome-message-header">
          <h1>The Tech</h1>
          <div
            style={{
              marginTop: "4rem",
              display: "flex",
              justifyContent: "space-around",
              flexDirection: windowSize.innerWidth < 500 ? "column" : "row",
              alignItems: "center",
            }}
          >
            {/* Mern Logo */}
            <div
              style={{
                display: "flex",
                alignItems: "right",
                width: windowSize.innerWidth < 500 ? "100%" : "45%",
                height: "100%",
                margin: "1rem 0",
                justifyContent: "center",
              }}
            >
              <MernLogo />
            </div>
            {/* Tech Stack Description */}
            <div
              style={{
                display: "flex",
                alignItems: "left",
                width: windowSize.innerWidth < 500 ? "100%" : "45%",
                height: "100%",
                marginTop: windowSize.innerWidth < 500 ? "2rem" : "",
              }}
            >
              <p className="fade-in">
                I chose the MERN stack for my project to enhance my Node.js
                skills and leverage MongoDB for its flexible database
                capabilities. I scrape an NHL API, format the data with
                TypeScript types, and use a scheduled seed file (using
                toad-scheduler) to keep my database up-to-date with the latest
                team and player statistics.
              </p>
            </div>
          </div>
        </div>
        <PageDivider />

        {/* KEY FEATURES */}
        <div className="welcome-message-header">
          <h1>Key Features</h1>
          {/* Feature #1 */}
          <div style={featureSectionDivProps}>
            <FeatureVideo
              videoSrc={featureItems[0].src}
              windowWidth={windowSize.innerWidth}
              featureDescription={featureItems[0].description}
              featureTitle={featureItems[0].title}
            />
          </div>
          {/* Feature #2 */}
          <div style={featureSectionDivProps}>
            <FeatureVideo
              videoSrc={featureItems[1].src}
              windowWidth={windowSize.innerWidth}
              featureDescription={featureItems[1].description}
              featureTitle={featureItems[1].title}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
