import React from "react";
import { Alert, AlertTitle } from "@mui/material";
import { PlayerDataType } from "../../../shared/types";
import Loader from "../../../shared/components/Loader";

interface StatusAlertsProps {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  data: PlayerDataType[] | undefined;
}

const StatusAlerts: React.FC<StatusAlertsProps> = ({
  isLoading,
  isError,
  isSuccess,
  data,
}) => {
  return (
    <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {isLoading && <Loader />}
      {isError && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          <strong>Error while fetching data</strong>
        </Alert>
      )}
      {isSuccess && data && data.length === 0 && (
        <Alert severity="warning">
          <AlertTitle>Warning</AlertTitle>
          <strong>There is no data to display</strong>
        </Alert>
      )}
    </div>
  );
};

export default StatusAlerts; 