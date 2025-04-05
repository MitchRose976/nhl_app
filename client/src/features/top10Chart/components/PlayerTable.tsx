import React from "react";
import { Table, TableContainer, TableRow, TableCell, TableBody } from "@mui/material";
import { PlayerDataType } from "../../../shared/types";
import { formatStat } from "../../../shared/utils";

interface PlayerTableProps {
  players: PlayerDataType[];
  statType: string;
  onPlayerHover: (index: number) => void;
  windowWidth: number;
}

const PlayerTable: React.FC<PlayerTableProps> = ({
  players,
  statType,
  onPlayerHover,
  windowWidth,
}) => (
  <TableContainer sx={{ maxWidth: windowWidth < 500 ? "45%" : "40%" }}>
    <Table size="small">
      <TableBody>
        {players.map((player, index) => (
          <TableRow key={index} onMouseEnter={() => onPlayerHover(index)}>
            <TableCell
              size="small"
              sx={{ fontSize: windowWidth < 500 ? "0.65rem" : "0.85rem" }}
            >
              {`${player.playerInfo.firstName.default} ${player.playerInfo.lastName.default}`}
            </TableCell>
            <TableCell>{formatStat(player, statType)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default PlayerTable; 