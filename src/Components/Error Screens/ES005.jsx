import { Box, Typography } from "@mui/material";

export default function ES005({}) {
  return (
    <Box
      sx={{
        height: "100vh", // full screen height
        display: "flex",
        justifyContent: "center", // center horizontally
        alignItems: "center", // center vertically
      }}
    >
      {/* Big centered error box */}
      <Box
        sx={{
          p: 4,
          borderRadius: "12px",
          backgroundColor: "white",
          width: "60%", // much bigger
          height: "50vh", // taller
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Error message body */}
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center", // center horizontally
            alignItems: "center", // center vertically
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              color: "red",
              fontSize: 26,
              whiteSpace: "pre-line",
            }}
          >
            No contacts have been associated to the account in the deal. Please
            associate at least one contact to the account to proceed.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
