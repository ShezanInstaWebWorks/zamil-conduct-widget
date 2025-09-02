import { Box, TextField, Button, Paper, Grid2, MenuItem } from "@mui/material";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CircularProgress } from "@mui/material";
import Information1 from "../Information/Information1";
import { useEffect } from "react";

const Screen007 = ({
  route_1106_data,
  setFollowUpDueDate,
  followUpDueDate,
  setScreen,
  setCalculatedDate,
  calculatedDate,
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
              onClick={() => setScreen("Screen001")}
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

            <Typography
              variant="h5"
              sx={{ my: 3, textAlign: "center", fontWeight: "bold" }}
            >
              Set Next Follow Up Date
            </Typography>

            {/* First TextField: Select # of Business Days */}
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <TextField
                id="outlined-select-followup"
                size="small"
                slotProps={{ inputLabel: { shrink: true } }}
                sx={{
                  width: "300px",
                  "& .MuiInputBase-input": {
                    textAlign: "center",
                  },
                }}
                select
                label="Select Next Follow Up Due Date"
                value={followUpDueDate ?? ""} // ✅ ensure controlled input
                onChange={(e) => {
                  const value = e.target.value;
                  setFollowUpDueDate(value);
                  if (value.includes("business day")) {
                    const days = parseInt(value.match(/\d+/)[0]);
                    const result = addBusinessDays(new Date(), days);
                    setCalculatedDate(formatDate(result));
                  }
                }}
              >
                {/* <= 3 follow ups */}
                {route_1106_data?.previous_task_details?.Follow_Up_Number <=
                  3 && (
                  <MenuItem value="+ 1 business day">+ 1 business day</MenuItem>
                )}

                {/* 4–6 follow ups */}
                {route_1106_data?.previous_task_details?.Follow_Up_Number >=
                  4 &&
                  route_1106_data?.previous_task_details?.Follow_Up_Number <=
                    6 && (
                    <>
                      <MenuItem value="+ 1 business day">
                        + 1 business day
                      </MenuItem>
                      <MenuItem value="+ 2 business day">
                        + 2 business day
                      </MenuItem>
                      <MenuItem value="+ 3 business day">
                        + 3 business day
                      </MenuItem>
                    </>
                  )}

                {/* 7 follow ups */}
                {route_1106_data?.previous_task_details?.Follow_Up_Number >=
                  7 &&
                  [...Array(7)].map((_, i) => (
                    <MenuItem key={i + 1} value={`+ ${i + 1} business day`}>
                      + {i + 1} business day
                    </MenuItem>
                  ))}
              </TextField>
            </Box>

            {/* Second TextField: Show the calculated result (Read-only) */}
            <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
              <TextField
                id="outlined-followup-date"
                size="small"
                sx={{
                  width: "300px",
                  "& .MuiInputBase-input": {
                    textAlign: "center",
                  },
                }}
                slotProps={{ inputLabel: { shrink: true } }}
                label="Next Follow Up Date"
                value={calculatedDate || ""} // ✅ ensures empty string instead of undefined
                disabled
              />
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Button
                variant="contained"
                size="small"
                color="success"
                onClick={() => setScreen("Screen008")}
                sx={{ px: 5, width: "300px" }}
                disabled={!followUpDueDate} // ✅ only disable when nothing is selected
              >
                Next
              </Button>
            </Box>
          </Paper>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Screen007;
