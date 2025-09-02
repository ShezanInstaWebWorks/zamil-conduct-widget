import { useEffect, useState } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { Box, Typography } from "@mui/material";

// Extend Day.js with plugins
dayjs.extend(utc);
dayjs.extend(timezone);

const LiveClock = ({ selectedLocation }) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    if (selectedLocation?.Timezone) {
      const interval = setInterval(() => {
        const time = dayjs()
          .tz(selectedLocation?.Timezone)
          .format("DD/MM/YYYY hh:mm:ss A");
        setCurrentTime(time);
      }, 1000); // Update every second
      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [selectedLocation?.Timezone]);

  return (
    <Box
      sx={{
        display: "flex",
        border: "2px solid #bfbfbf",
        px: 1,
        alignItems: "center",
        borderRadius: "5px",
      }}
    >
      <AccessTimeIcon sx={{ mr: 0.5, color: "#adadad" }} />
      <Typography sx={{ color: "#adadad" }}>
        {selectedLocation?.Name} - Current Date/Time:
        {currentTime}
      </Typography>
    </Box>
  );
};

export default LiveClock;
