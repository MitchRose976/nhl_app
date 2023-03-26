import { ThemeOptions } from "@mui/material/styles";
import React from "react";

declare module '@mui/material/styles' {
  interface ThemeOptions {
    custom: {
      blue: React.CSSProperties['color']
      lightBlue: React.CSSProperties['color']
      red: React.CSSProperties['color']
      lightRed: React.CSSProperties['color']
    }
  }
}