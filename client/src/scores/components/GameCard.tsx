import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LoadingBar from "../../shared/components/LoadingBar";
import { gameCardSXProps, gameCardContentSXProps } from "../styles";
import { GameInterface } from "../../shared/types";
import { Divider } from "@mui/material";
import "../../shared/style.scss";
import { useGameStatus, GameStatus } from "./game-card/useGameStatus";
import ScoreLine from "./game-card/ScoreLine";
import MatchupInfo from "./game-card/MatchupInfo";
import GameCardModal from "./game-card/GameCardModal";

interface GameCardProps {
  game: GameInterface;
}

const GameCard = ({ game }: GameCardProps) => {
  const gameStatus = useGameStatus(game);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleClick = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  if (!game) return null;

  return (
    <Card raised sx={gameCardSXProps}>
      <Typography
        sx={{ paddingTop: "10px", paddingBottom: "0" }}
        style={{ fontWeight: "bold" }}
      >
        {gameStatus.component}
      </Typography>
      {gameStatus.status === "LIVE" ? (
        <LoadingBar />
      ) : (
        <Divider sx={{ width: "100%", margin: "0.5rem 0" }} />
      )}
      <CardContent sx={gameCardContentSXProps} style={{ padding: 0 }}>
        <ScoreLine game={game} />
      </CardContent>
      <CardContent style={{ padding: 0 }}>
        <MatchupInfo game={game} />
      </CardContent>
      <CardActions>
        <Button
          onClick={handleClick}
          variant="contained"
          color="primary"
          size="small"
          sx={{ padding: "2px 5px" }}
        >
          More
        </Button>
        <GameCardModal 
          open={openModal} 
          onClose={handleClose} 
          game={game} 
          status={gameStatus} 
        />
      </CardActions>
    </Card>
  );
};

export default GameCard;
