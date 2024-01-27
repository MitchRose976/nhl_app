import React, { CSSProperties, useEffect, useState } from "react";
import { getWindowSize } from "../../shared/utils";
import "./style.scss";
import PageDivider from "./components/PageDivider";
import MernLogo from "./components/MernLogo";
import NHL_Hub_Head_to_Head from "../../shared/assets/NHL_Hub_Head_to_Head.mp4";
import NHL_Hub_Live_Stats from "../../shared/assets/NHL_Hub_Live_Stats.mp4";
import NHL_Hub_Live_Stats_2 from "../../shared/assets/NHL_Hub_Live_Stats_2.mp4";
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
      title: "Final Scores",
      src: NHL_Hub_Live_Stats,
      description:
        "See the final scores and statistics from today's games. Check who scored, analyze game statistics and see if your bet came through or not.",
    },
    {
      title: "Games In Progress",
      src: NHL_Hub_Live_Stats_2,
      description:
        "Track live game stats and goals. Stay updated on shots, faceoff wins, penalties more. Get real-time goal scoring details, including player names, goal times, and assists. Never miss a moment with accurate and comprehensive data.",
    },
    {
      title: "Head-to-Head Stats",
      src: NHL_Hub_Head_to_Head,
      description:
        "See head-to-head stats and view in-depth team analysis for todays games and gain valuable insights into team performance before the puck drops.",
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
        {/* Top 5 Hottest Players */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <iframe
            title="Top 5 Points in Last 5"
            style={{
              background: "#21313C",
              border: "none",
              borderRadius: "0.5rem",
              boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
              marginRight: "0.3rem",
            }}
            // style="background: #21313C;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);"
            width="640"
            height="480"
            src="https://charts.mongodb.com/charts-project-0-umige/embed/charts?id=65b41f2e-18f6-4151-8dfb-2388359b2a2d&maxDataAge=300&theme=dark&autoRefresh=true"
          />
          <iframe
            title="Top 5 Goals in Last 5"
            style={{
              background: "#21313C",
              border: "none",
              borderRadius: "0.5rem",
              boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
              marginLeft: "0.3rem",
            }}
            width="640"
            height="480"
            src="https://charts.mongodb.com/charts-project-0-umige/embed/charts?id=72cce2c4-b49e-4465-8b75-a8a5b167b7cb&maxDataAge=300&theme=dark&autoRefresh=true"
          ></iframe>
        </div>
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
          {featureItems.map(({ title, src, description }) => {
            return (
              <div style={featureSectionDivProps} key={`${title} div`}>
                <FeatureVideo
                  videoSrc={src}
                  windowWidth={windowSize.innerWidth}
                  featureDescription={description}
                  featureTitle={title}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HomePage;
