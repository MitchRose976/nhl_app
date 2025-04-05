import { Autocomplete, TextField, Chip, Box, Typography } from "@mui/material";
import { TEAM_IDS } from "../constants";
import { formGetTeamLogoUrl } from "../utils";

interface TeamSelectorProps {
  selectedTeams: typeof TEAM_IDS;
  onTeamChange: (teams: typeof TEAM_IDS) => void;
}

const TeamSelector = ({ selectedTeams, onTeamChange }: TeamSelectorProps) => {
  const sortedTeams = TEAM_IDS.slice().sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const handleTeamChange = (event: any, newValue: any) => {
    if (newValue.length <= 3) {
      onTeamChange(newValue);
    }
  };

  return (
    <Box sx={{ width: "100%", marginBottom: "2rem" }}>
      <Autocomplete
        multiple
        id="team-selector"
        options={sortedTeams}
        value={selectedTeams}
        onChange={handleTeamChange}
        getOptionLabel={(option) => option.name}
        renderOption={(props, option) => (
          <Box component="li" {...props}>
            <img
              src={formGetTeamLogoUrl(option.abbreviation)}
              alt={`${option.name} logo`}
              style={{ width: 24, height: 24, marginRight: 8 }}
            />
            {option.name}
          </Box>
        )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => {
            const { key, ...otherProps } = getTagProps({ index });
            return (
              <Chip
                key={key}
                {...otherProps}
                label={option.name}
                avatar={
                  <img
                    src={formGetTeamLogoUrl(option.abbreviation)}
                    alt={`${option.name} logo`}
                    style={{ width: 24, height: 24 }}
                  />
                }
              />
            );
          })
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Teams (max 3)"
            placeholder="Search teams..."
          />
        )}
        isOptionEqualToValue={(option, value) => option.teamID === value.teamID}
      />
      <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
        Select up to 3 teams to compare
      </Typography>
    </Box>
  );
};

export default TeamSelector; 