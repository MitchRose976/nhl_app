import { Button, Box, Typography, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TeamInput from "./TeamInput";
import RemoveIcon from "@mui/icons-material/Remove";

interface TeamSelectDropdownProps {
  fetchTeamData: any;
  setNumOfTeamsToCompare: any;
  numOfTeamsToCompare: number;
}

const TeamSelectDropdown = ({
  fetchTeamData,
  setNumOfTeamsToCompare,
  numOfTeamsToCompare,
}: TeamSelectDropdownProps) => {
  const addTeamToCompare = () => {
    setNumOfTeamsToCompare((state: number) =>
      state < 3 ? (state += 1) : state
    );
  };

  const subtractTeamToCompare = () => {
    setNumOfTeamsToCompare((state: number) =>
      state > 1 ? (state -= 1) : state
    );
  };

  const gridItemSizeProps = {
    xs: 12,
    sm: 12,
    md: 6,
  };

  const gridItemSxProps = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "left",
        alignItems: "center",
        marginTop: "2rem",
        width: "90%",
      }}
    >
      <Grid container columns={10}>
        {/* FIRST TEAM */}
        <Grid item {...gridItemSizeProps} sx={gridItemSxProps}>
          <TeamInput
            teamInputOrder={1}
            numOfTeamsToCompare={numOfTeamsToCompare}
            fetchTeamData={fetchTeamData}
          />
        </Grid>
        {/* SECOND TEAM */}
        <Grid item {...gridItemSizeProps} sx={gridItemSxProps}>
          <TeamInput
            teamInputOrder={2}
            numOfTeamsToCompare={numOfTeamsToCompare}
            fetchTeamData={fetchTeamData}
          />
        </Grid>
        {/* THIRD TEAM */}
        <Grid item {...gridItemSizeProps} sx={gridItemSxProps}>
          <TeamInput
            teamInputOrder={3}
            numOfTeamsToCompare={numOfTeamsToCompare}
            fetchTeamData={fetchTeamData}
          />
        </Grid>
        {/* FOURTH TEAM */}
        {/* <Grid item {...gridItemSizeProps} sx={gridItemSxProps}>
          <TeamInput
            teamInputOrder={4}
            numOfTeamsToCompare={numOfTeamsToCompare}
            fetchTeamData={fetchTeamData}
          />
        </Grid> */}
        {/* FIFTH TEAM */}
        {/* <Grid item {...gridItemSizeProps} sx={gridItemSxProps}>
          <TeamInput
            teamInputOrder={5}
            numOfTeamsToCompare={numOfTeamsToCompare}
            fetchTeamData={fetchTeamData}
          />
        </Grid> */}
        {/* Add and Remove Buttons */}
        <Grid item {...gridItemSizeProps} sx={{ marginTop: "0.5rem" }}>
          <Button
            variant="outlined"
            className="flex-box-center"
            sx={{
              marginLeft: "0.5rem",
              backgroundColor: "rgba(0, 204, 44, 0.8)",
            }}
            onClick={addTeamToCompare}
          >
            <AddIcon />
            <Typography sx={{ fontSize: "0.8rem" }}>Add Team</Typography>
          </Button>

          <Button
            variant="outlined"
            className="flex-box-center"
            sx={{
              marginLeft: "0.5rem",
              backgroundColor: "rgba(224, 41, 50, 0.75)",
            }}
            onClick={subtractTeamToCompare}
          >
            <RemoveIcon />
            <Typography sx={{ fontSize: "0.8rem" }}>Remove Team</Typography>
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TeamSelectDropdown;
