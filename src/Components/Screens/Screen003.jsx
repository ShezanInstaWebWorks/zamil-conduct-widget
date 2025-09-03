import { Box, TextField, Button, Paper, Grid2, MenuItem } from "@mui/material";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Icon for the Back button
import Information1 from "../Information/Information1";
import { useState } from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

const Screen003 = ({
  route_1106_data,
  setScreen,
  setExtensionNote,
  extensionNote,
  setDueDate,
  dueDate,
  setFollowUpDueDate,
  followUpDueDate,
  handle_Route_1101,
  handle_Route_1102,
}) => {
  const [error, setError] = useState(false);
  const today = dayjs();
  const maxDate = today.add(1, "year");

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

  const handleNext = () => {
    if (followUpDueDate === "custom date") {
      const wordCount = extensionNote.trim().split(/\s+/).length;

      if (wordCount < 5) {
        setError(true);
      } else {
        setError(false);
        handle_Route_1101();
      }
    } else {
      handle_Route_1102();
    }
  };

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
              onClick={() => setScreen("Screen002")}
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
          <Paper
            elevation={3}
            sx={{
              p: 4, // mobile: all sides = 4
              pr: { md: 10 }, // md+: restore your desktop padding
              pl: { md: 10 },
              pt: { md: 4 },
              pb: { md: 5 },
            }}
          >
            {/* ...unchanged content... */}

            {followUpDueDate === "custom date" && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  width: "100%",
                }}
              >
                <Typography sx={{ textAlign: "left" }}>
                  Reason for Extension (mandatory)
                </Typography>
                <TextField
                  placeholder="Please add notes about why the follow up date needs to be extended"
                  value={extensionNote}
                  onChange={(e) => setExtensionNote(e.target.value)}
                  multiline
                  rows={4}
                  fullWidth
                  variant="outlined"
                  sx={{
                    width: { xs: "100%", sm: 460 }, // prevent overflow on mobile
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderWidth: 2 },
                      "&:hover fieldset": { borderWidth: 2 },
                      "&.Mui-focused fieldset": { borderWidth: 2 },
                    },
                  }}
                  error={error}
                />
                {error && (
                  <Typography
                    variant="caption"
                    sx={{
                      color: "red",
                      display: "block",
                      fontSize: "11px",
                      mt: 0.5,
                    }}
                  >
                    Minimum description length not reached. Please enter a more
                    descriptive reason for extension.
                  </Typography>
                )}
              </Box>
            )}

            {/* Confirm Button - responsive width */}
            <Box sx={{ textAlign: "center" }}>
              <Button
                variant="contained"
                size="small"
                color="success"
                onClick={handleNext}
                sx={{
                  width: { xs: "100%", sm: 400 }, // full width on mobile, fixed on desktop
                  maxWidth: "100%",
                  px: { xs: 2, sm: 5 }, // comfortable padding
                  mx: "auto",
                }}
                disabled={
                  !dueDate ||
                  !followUpDueDate ||
                  (followUpDueDate === "custom date" && !extensionNote)
                }
              >
                Confirm Follow Up Date & Close Task
              </Button>
            </Box>
          </Paper>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Screen003;
