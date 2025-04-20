import { SxProps } from "@mui/material";

export const scoreBarArrowSXProps: SxProps = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "1rem",
};

export const gameCardSXProps: SxProps = {
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  padding: "0 1rem",
  maxWidth: "8.5rem",
  width: "8.5rem",
  minWidth: "8.5rem",
  cursor: "pointer",
  boxShadow: 3,
  "&:hover": {
    boxShadow: 8,
  },
};

export const gameCardContentSXProps: SxProps = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingBottom: "10px",
};
