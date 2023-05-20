import React from "react";
import {
  Avatar,
  AvatarGroup,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import { PlayerDataType } from "../../../../server/src/types";
import { formGetTeamLogoUrl, formatStat } from "../utils";
import { statTypeMapping } from "../constants";
import "../../shared/style.scss";

interface MiniPlayerCardProps {
  player: PlayerDataType;
  statType: string;
}

const MiniPlayerCard = ({ player, statType }: MiniPlayerCardProps) => {
  const renderPlayerPic = () => {
    return (
      <AvatarGroup total={2} spacing={"small"}>
        <Avatar
          alt={`${player.playerInfo.fullName} headshot`}
          src={player.playerHeadshot}
          sx={{ width: 85, height: 85 }}
        />
        <Avatar
          alt={`${player.playerInfo.currentTeam.name} logo`}
          src={formGetTeamLogoUrl(player.playerInfo.currentTeam.id)}
          sx={{ width: 45, height: 40 }}
          style={{
            marginLeft: "-28px",
            zIndex: 999,
            marginTop: "55px",
            background: "#fff",
          }}
        />
      </AvatarGroup>
    );
  };

  const renderPlayerInfo = () => {
    return (
      <>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "-1.2rem",
            padding: "0.9rem",
          }}
        >
          <Typography
            variant={"h2"}
            align={"left"}
            sx={{
              fontSize: "1.2rem",
              fontWeight: "400",
            }}
          >
            {player.playerInfo.primaryNumber}
          </Typography>
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              marginLeft: "0.3rem",
              borderWidth: "1px",
              height: "2.4rem",
              borderColor: "#36454F",
            }}
          />
          <Typography
            variant={"body2"}
            align={"left"}
            sx={{
              fontSize: "0.9rem",
              marginLeft: "0.5rem",
            }}
          >
            {player.playerInfo.fullName}
          </Typography>
        </CardContent>

        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0.5rem 1.3rem 0.5rem 0.5rem",
            marginTop: "-1rem",
          }}
        >
          <Typography
            variant={"body2"}
            align={"right"}
            sx={{ fontSize: "0.75rem" }}
          >
            {player.playerInfo.currentTeam.name}
          </Typography>
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              margin: "0rem 0.5rem 0 0.5rem",
              borderWidth: "1px",
              height: "2rem",
              borderColor: "#36454F",
            }}
          />
          <Typography>{player.playerInfo.primaryPosition.code}</Typography>
        </CardContent>
      </>
    );
  };

  const renderStat = () => {
    return (
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "-0.5rem",
        }}
      >
        <Typography sx={{ fontSize: "0.8rem" }}>
          {statTypeMapping[statType].label}
        </Typography>
        <Typography sx={{ fontSize: "1.2rem", fontWeight: "700" }}>
          {formatStat(player, statType)}
        </Typography>
      </CardContent>
    );
  };

  return (
    <Paper>
      <Card
        raised={true}
        sx={{
          maxWidth: "13rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CardHeader avatar={renderPlayerPic()} />
        {renderPlayerInfo()}
        {renderStat()}
      </Card>
    </Paper>
  );
};

export default MiniPlayerCard;
