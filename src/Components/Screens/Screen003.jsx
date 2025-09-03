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
              p: 4, // xs: all sides = 4
              pr: { md: 10 }, // md+: restore your desktop paddings
              pl: { md: 10 },
              pt: { md: 4 },
              pb: { md: 5 },
            }}
          >
            <Box
              sx={{
                backgroundColor: "#a5d6a7",
                p: 1,
                borderRadius: "4px",
                textAlign: "center",
                mb: 1,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Customer Answered
              </Typography>
            </Box>

            <Typography
              sx={{ mb: 1, mt: 1, textAlign: "center", fontWeight: "bold" }}
            >
              Set Next Follow Up Date
            </Typography>

            {/* Centered Select Field */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                my: 2,
              }}
            >
              <TextField
                id="outlined-select-followup"
                size="small"
                slotProps={{ inputLabel: { shrink: true } }}
                sx={{
                  mb: 2,
                  width: 250,
                  "& .MuiInputBase-input": {
                    textAlign: "center", // only center the value, not label
                  },
                }}
                select
                label="Select Next Follow Up Due Date"
                value={followUpDueDate}
                onChange={(e) => {
                  const value = e.target.value;
                  setFollowUpDueDate(value);

                  if (value.includes("business day")) {
                    const days = parseInt(value.match(/\d+/)[0]); // extract # of days
                    const result = addBusinessDays(new Date(), days); // calculate
                    setDueDate(dayjs(result).format("YYYY-MM-DD"));
                  } else {
                    setDueDate(null);
                    setExtensionNote("");
                  }
                }}
              >
                <MenuItem value="" disabled></MenuItem>
                <MenuItem value="+ 1 business day">+ 1 business day</MenuItem>
                <MenuItem value="+ 2 business day">+ 2 business day</MenuItem>
                <MenuItem value="+ 3 business day">+ 3 business day</MenuItem>
                <MenuItem value="+ 4 business day">+ 4 business day</MenuItem>
                <MenuItem value="custom date">custom date</MenuItem>
              </TextField>

              {followUpDueDate && (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Next Follow Up Date"
                    disabled={followUpDueDate !== "custom date" ? true : false}
                    value={dueDate ? dayjs(dueDate) : null}
                    onChange={(newValue) =>
                      setDueDate(dayjs(newValue).format("YYYY-MM-DD"))
                    }
                    sx={{ width: 250, mb: 2 }}
                    minDate={today}
                    maxDate={maxDate}
                    format="DD/MM/YYYY" // Controls display format
                    slotProps={{
                      textField: {
                        size: "small",
                        InputLabelProps: { shrink: true },
                        placeholder: "DD/MM/YYYY",
                        inputProps: {
                          readOnly: true, // Prevent typing
                        },
                      },
                    }}
                  />
                </LocalizationProvider>
              )}

              {followUpDueDate === "custom date" && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    textAlign: "center",
                    mx: "auto",
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
                      Minimum description length not reached. Please enter a
                      more descriptive reason for extension.
                    </Typography>
                  )}
                </Box>
              )}
            </Box>

            <Box sx={{ textAlign: "center" }}>
              <Button
                variant="contained"
                size="small"
                color="success"
                onClick={handleNext}
                sx={{
                  width: { xs: "100%", sm: 400 }, // full width on mobile, fixed on desktop
                  maxWidth: "100%",
                  px: { xs: 2, sm: 5 },
                  mx: "auto",
                }}
                disabled={
                  !dueDate ||
                  !followUpDueDate ||
                  (followUpDueDate === "custom date" && !extensionNote)
                }
              >
                Confirm Follow Up Date &amp; Close Task
              </Button>
            </Box>
          </Paper>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Screen003;
