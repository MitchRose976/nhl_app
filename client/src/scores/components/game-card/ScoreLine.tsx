import React from "react";
import { GameInterface } from "../../../shared/types";
import { formGetTeamLogoUrl } from "../../../shared/utils";
import TeamLogo from "../../../shared/components/TeamLogo";

interface ScoreLineProps {
  game: GameInterface;
}

const ScoreLine: React.FC<ScoreLineProps> = ({ game }) => {
  return (
    <div className="flex-box-center">
      <TeamLogo svgString={formGetTeamLogoUrl(game.teams.home.abbreviation)} width={40} height={40} />
      <strong>
        {game.scores[game.teams.home.abbreviation]} :{" "}
        {game.scores[game.teams.away.abbreviation]}
      </strong>{" "}
      <TeamLogo svgString={formGetTeamLogoUrl(game.teams.away.abbreviation)} width={40} height={40} />
    </div>
  );
};

export default ScoreLine; 