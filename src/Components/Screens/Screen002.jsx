import { Box, TextField, Button, Paper, Grid2 } from "@mui/material";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Icon for the Back button
import Information1 from "../Information/Information1";
import { useState } from "react";

const Screen002 = ({ route_1106_data, setNotes, notes, setScreen }) => {
  const [error, setError] = useState(false);

  const handleNext = () => {
    const wordCount = notes.trim().split(/\s+/).length;

    if (wordCount < 5) {
      setError(true);
    } else {
      setError(false);
      setScreen("Screen003");
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
              justifyContent: "space-between", // pushes buttons apart
              alignItems: "center",
            }}
          >
            {/* Left Button */}
            <Button
              onClick={() => setScreen("Screen001")}
              variant="contained"
              startIcon={<ArrowBackIcon />} // cleaner way to add icon
              sx={{ textTransform: "none" }}
            >
              Back
            </Button>

            {/* Right Button */}
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

        {/* Left Section with Information1 */}
        <Grid2 size={{ xs: 12, md: 4 }} sx={{ height: "85%" }}>
          <Information1 route_1106_data={route_1106_data} />
        </Grid2>

        {/* Right Section with Cancellation Reason and Confirmation */}
        <Grid2 size={{ xs: 12, md: 8 }}>
          <Paper
            elevation={3}
            sx={{
              pr: { xs: 4, sm: 10 },
              pl: { xs: 4, sm: 10 },
              pt: { xs: 4, sm: 4 },
              pb: { xs: 4, sm: 5 },
            }}
          >
            {/* Header */}
            <Box
              sx={{
                backgroundColor: "#a5d6a7",
                p: 1,
                borderRadius: "4px",
                textAlign: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Customer Answered
              </Typography>
            </Box>

            {/* Label */}
            <Typography
              variant="subtitle1"
              sx={{
                color: error ? "red" : "inherit",
                mt: 1,
              }}
            >
              Follow Up Notes
            </Typography>

            <Box sx={{ height: 172 }}>
              {/* Multiline Input */}
              <TextField
                placeholder="Please add notes about the follow up call you conducted with the customer"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                multiline
                rows={6}
                fullWidth
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderWidth: 2, // 🔹 always 2px border
                    },
                    "&:hover fieldset": {
                      borderWidth: 2,
                    },
                    "&.Mui-focused fieldset": {
                      borderWidth: 2,
                    },
                  },
                }}
                error={error}
              />
              {error && (
                <Typography
                  variant="caption"
                  sx={{ color: "red", display: "block", fontSize: "11px" }}
                >
                  Minimum description length not reached. Please enter a more
                  descriptive note.
                </Typography>
              )}
            </Box>
            {/* Next Button */}
            <Box sx={{ textAlign: "center", mt: 10 }}>
              <Button
                variant="contained"
                color="success"
                onClick={handleNext}
                sx={{ px: 5, mt: 3 }}
                disabled={!notes || notes.trim() === ""} // disable if empty
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

export default Screen002;
