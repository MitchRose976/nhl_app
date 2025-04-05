import React from "react";
import { Modal } from "@mui/material";
import GameModal from "../../../features/gameModal/GameModal";
import { GameInterface } from "../../../shared/types";
import { GameStatus } from "./useGameStatus";

interface GameCardModalProps {
  open: boolean;
  onClose: () => void;
  game: GameInterface;
  status: GameStatus;
}

const GameCardModal: React.FC<GameCardModalProps> = ({ 
  open, 
  onClose, 
  game, 
  status 
}) => {
  return (
    <Modal open={open} onClose={onClose} sx={{overflow: 'scroll'}}>
      <GameModal game={game} status={status} />
    </Modal>
  );
};

export default GameCardModal; 