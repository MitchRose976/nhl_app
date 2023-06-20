import React from 'react';
import { Typography, CircularProgress } from '@mui/material';
import '../style.scss';

const Loader = () => {
    return (
        <div
        className="flex-box-center"
        style={{
          height: "25rem",
          width: "100%",
          flexDirection: "column",
        }}
      >
        <Typography sx={{marginBottom: '1.5rem', fontSize: '1.2rem'}}>Loading Data...</Typography>
        <CircularProgress style={{ height: "5rem", width: "5rem" }} />
      </div>
    )
}

export default Loader;
