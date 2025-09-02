import { Box, TextField, Button, Paper, Grid2, MenuItem } from "@mui/material";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CircularProgress } from "@mui/material";
import Information1 from "../Information/Information1";
import { useEffect } from "react";

const Screen008 = ({
  route_1106_data,
  followUpDueDate,
  setScreen,
  setCalculatedDate,
  calculatedDate,
  handle_Route_1103,
}) => {
  const addBusinessDays = (startDate, businessDaysToAdd) => {
    let count = 0;
    let date = new Date(startDate);

    while (count < businessDaysToAdd) {
      date.setDate(date.getDate() + 1);
      const day = date.getDay(); // 0=Sun, 6=Sat
      if (day !== 0 && day !== 6) {
        count++;
      }
    }

    return date;
  };

  // ✅ Utility: Format date as DD/MMM/YY
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("default", { month: "short" });
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  };

  // ✅ Recalculate when followUpDueDate is already set (pre-populated case)
  useEffect(() => {
    if (followUpDueDate && followUpDueDate.includes("business day")) {
      const days = parseInt(followUpDueDate.match(/\d+/)[0]);
      const result = addBusinessDays(new Date(), days);
      setCalculatedDate(formatDate(result));
    } else {
      setCalculatedDate("");
    }
  }, [followUpDueDate]);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#CED4DA",
        display: "flex",
        justifyContent: "center",
        overflowY: "auto",
        top: "5%",
        p: 4,
        boxSizing: "border-box",
      }}
    >
      <Grid2
        container
        spacing={1}
        sx={{ maxWidth: "1200px", width: "100%", mt: 2 }}
      >
        {/* Top bar with Back button and confirmation text */}
        <Grid2 size={{ xs: 12 }}>
          <Paper
            sx={{
              p: 2,
              mb: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              onClick={() => setScreen("Screen007")}
              variant="contained"
              startIcon={<ArrowBackIcon />}
              sx={{ textTransform: "none" }}
            >
              Back
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={() => window.open(route_1106_data?.deal_link, "_blank")}
              sx={{ textTransform: "none" }}
            >
              Open Deal Info In New Tab
            </Button>
          </Paper>
        </Grid2>

        {/* Left Section */}
        <Grid2 size={{ xs: 12, md: 4 }} sx={{ height: "85%" }}>
          <Information1 route_1106_data={route_1106_data} />
        </Grid2>

        {/* Right Section */}
        <Grid2 size={{ xs: 12, md: 8 }}>
          <Paper elevation={3} sx={{ pr: 10, pl: 10, pt: 4, pb: 5 }}>
            <Box
              sx={{
                backgroundColor: "red",
                p: 1,
                borderRadius: "4px",
                textAlign: "center",
                mb: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "white" }}
              >
                Customer did not answer
              </Typography>
            </Box>

            {/* Second TextField: Show the calculated result (Read-only) */}
            <Box
              sx={{ display: "flex", justifyContent: "center", mb: 10, mt: 10 }}
            >
              <TextField
                id="outlined-followup-date"
                size="small"
                sx={{
                  width: "300px",
                  "& .MuiInputBase-input": {
                    textAlign: "center",
                  },
                }}
                label="Next Follow Up Date"
                value={calculatedDate || ""} // ✅ ensures empty string instead of undefined
                disabled
              />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 6 }}>
              <Typography>Would you like to send a follow up email?</Typography>
            </Box>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 10 }}
            >
              <Button
                variant="contained"
                size="small"
                color="error"
                onClick={() => handle_Route_1103()}
                sx={{ px: 5, width: "300px" }}
              >
                No thanks, Just Confirm Next Follow Up Date
              </Button>

              <Button
                variant="contained"
                size="small"
                color="success"
                onClick={() => setScreen("Screen009")}
                sx={{ px: 5, width: "300px" }}
                // disabled={!followUpDueDate}
              >
                Yes, Send a Follow Up Email
              </Button>
            </Box>
          </Paper>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Screen008;
