import { Box, Button, TextField, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import dayjs from "dayjs";
import LiveClock from "./LiveClock";
export default function Screen006({ route_1106_data }) {
  const handleCloseWidget = async () => {
    await ZOHO.CRM.UI.Popup.closeReload().then(function (data) {});
  };
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "5px",
          backgroundColor: "white",
          width: "46%",
          py: 3,
          px: 2,
        }}
      >
        <Typography sx={{ textAlign: "center", mb: 2, fontSize: "18px" }}>
          {route_1106_data?.previous_task_details?.Subject} has been marked
          complete and the next follow up has been created.
        </Typography>

        <CheckCircleOutlineIcon
          sx={{ color: "green", fontSize: 150, mt: 5, mb: 8 }}
        />

        <Button
          sx={{ width: 200 }}
          onClick={handleCloseWidget}
          variant="contained"
          color="success"
        >
          Close Widget
        </Button>
      </Box>
    </Box>
  );
}
