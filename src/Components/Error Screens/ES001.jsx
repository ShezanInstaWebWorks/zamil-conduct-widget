import { Box, Typography } from "@mui/material";

export default function ES001({ errorResp }) {
  return (
    <Box
      sx={{
        height: "100vh", // full screen height
        display: "flex",
        justifyContent: "center", // center horizontally
        alignItems: "center", // center vertically
        backgroundColor: "#f8f9fa", // light background
      }}
    >
      {/* Big centered error box */}
      <Box
        sx={{
          p: 4,
          borderRadius: "12px",
          width: "60%", // much bigger
          height: "50vh", // taller
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header row with close button */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{
              fontWeight: "bold",
              color: "red",
              fontSize: 28,
              textAlign: "center",
              flexGrow: 1,
            }}
          >
            {errorResp?.header ? errorResp?.header : "Error!"}
          </Typography>
          <></>
        </Box>

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
            {errorResp?.message
              ? errorResp?.message
              : "An internal error occurred"}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
