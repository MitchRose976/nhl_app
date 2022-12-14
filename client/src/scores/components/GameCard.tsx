import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LoadingBar from "../../shared/components/LoadingBar";
import {gameCardSXProps, gameCardContentSXProps} from "../styles";

const nhlLogoUrl =
  "https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/";

const GameCard = () => {
  const [logos, setLogos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [intermission, setIntermission] = useState(false);

  const renderTeamLogo = (svgString: string) => {
    return svgString !== "" ? (
      <svg width="40" height="40">
        <image
          href={`${svgString}`}
          // src={`${svgString}`}
          width="40"
          height="40"
        />
      </svg>
    ) : null;
  };

  useEffect(() => {
    setLoading(true);
    const numOfTeams = 30;
    let teamLogosUrls = [];
    for (let i = 0; i < numOfTeams; i++) {
      // push all team logo urls to array
      if (i + 1 !== 11 && i + 1 !== 27) {
        const logoRequest = axios.get(`${nhlLogoUrl}${i + 1}.svg`);
        teamLogosUrls.push(logoRequest);
      }
    }
    axios
      .all(teamLogosUrls)
      .then((response: AxiosResponse<any, any>[]) => {
        let teamLogos: string[] = [];
        response.forEach((logo) => {
          teamLogos.push(logo.config.url ? logo.config.url : "");
        });
        setLogos(teamLogos);
      })
      .catch((error: any) => console.log("mitch error: ", error));
    setLoading(false);
  }, []);

  return !loading ? (
    <Card
      raised
      sx={gameCardSXProps}
    >
      <Typography
        sx={{ paddingTop: "10px", paddingBottom: "0" }}
        style={{ fontWeight: "bold" }}
      >
        P1 - 16:31
      </Typography>
      {/* Need a redux variable to read if it is intermission or not */}
      {!intermission ? <LoadingBar /> : "Intermission"}
      <CardContent sx={gameCardContentSXProps} style={{ padding: 0 }}>
        {logos[0] && renderTeamLogo(logos[0])} <strong>3 - 1</strong>{" "}
        {logos[1] && renderTeamLogo(logos[1])}
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          size="small"
          sx={{ padding: "2px 5px" }}
        >
          More
        </Button>
      </CardActions>
    </Card>
  ) : null;
};

export default GameCard;
