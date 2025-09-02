import {
  Box,
  TextField,
  Button,
  Paper,
  Grid2,
  MenuItem,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CircularProgress } from "@mui/material";
import Information1 from "../Information/Information1";
import { useEffect } from "react";

const Screen009 = ({
  route_1106_data,
  setSelectedTo,
  selectedTo,
  setSelectedCC,
  selectedCC,
  setScreen,
  calculatedDate,
  handle_Route_1104,
}) => {
  const handleToChange = (contact) => {
    setSelectedTo((prev) => {
      if (prev?.email === contact.Email) {
        // ✅ unselect if same one clicked again
        return null;
      }

      // ✅ remove from CC if exists
      setSelectedCC((ccPrev) => ccPrev.filter((e) => e !== contact.Email));

      return {
        name: `${contact.First_Name || ""} ${contact.Last_Name || ""}`.trim(),
        email: contact.Email || "",
        id: contact.id || "",
      };
    });
  };

  const handleCCChange = (contact) => {
    const email = contact.Email || "";
    setSelectedCC((prev) => {
      if (selectedTo?.email === email) return prev; // ❌ prevent adding if same as To

      return prev.includes(email)
        ? prev.filter((e) => e !== email)
        : [...prev, email];
    });
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
            {/* Left Button */}
            <Button
              onClick={() => setScreen("Screen008")}
              variant="contained"
              startIcon={<ArrowBackIcon />}
              sx={{ textTransform: "none" }}
            >
              Back
            </Button>

            {/* Middle Banner */}
            <Box
              sx={{
                backgroundColor: "red",
                p: 0.3,
                borderRadius: "4px",
                textAlign: "center",
                flexGrow: 1, // makes it take remaining space
                mx: 18, // margin between buttons
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "white" }}
              >
                Customer did not answer
              </Typography>
            </Box>

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

        {/* Left Section */}

        <Grid2 size={{ xs: 12, md: 8 }}>
          <Paper
            elevation={3}
            sx={{ pr: 5, pl: 5, pt: 2, pb: 2, minHeight: "550px" }}
          >
            <Box sx={{ display: "flex", justifyContent: "center", mb: 6 }}>
              <Typography sx={{ fontSize: "18px" }}>
                Would you like to send a follow up email?
              </Typography>
            </Box>

            <TableContainer
              component={Paper}
              sx={{
                maxWidth: 650,
                mx: "auto",
                border: "1px solid",
                borderRadius: 0,
                maxHeight: 400,
                overflowY: "auto",
              }}
            >
              <Table
                size="small"
                aria-label="contacts table"
                stickyHeader
                sx={{
                  border: "1px solid",
                  borderCollapse: "collapse",
                  "& th, & td": {
                    border: "1px solid",
                  },
                }}
              >
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#fcebd5" }}>
                    <TableCell sx={{ fontWeight: "bold" }}>To</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>CC</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Contact Name
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Contact Email
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {route_1106_data?.contacts?.map((contact, index) => {
                    const email = contact.Email ? String(contact.Email) : null;

                    return (
                      <TableRow key={index}>
                        {/* To */}
                        <TableCell align="center" sx={{ width: 50, p: 0 }}>
                          <Checkbox
                            size="small"
                            disabled={
                              !email ||
                              (selectedTo && selectedTo.email !== email)
                            }
                            checked={selectedTo?.email === email}
                            onChange={() => handleToChange(contact)}
                          />
                        </TableCell>

                        {/* CC */}
                        <TableCell align="center" sx={{ width: 50, p: 0 }}>
                          <Checkbox
                            size="small"
                            disabled={!email || selectedTo?.email === email}
                            checked={selectedCC.includes(email)}
                            onChange={() => handleCCChange(contact)}
                          />
                        </TableCell>

                        <TableCell>
                          {contact.First_Name} {contact.Last_Name}
                        </TableCell>
                        <TableCell>{email || ""}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid2>

        {/* Right Section */}
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Paper
            sx={{
              p: 4,
              mb: 1,
              minHeight: "520px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between", // pushes button to bottom
              alignItems: "center",
            }}
          >
            {/* Top Content (TextField) */}
            <Box sx={{ mt: 2, mb: 2 }}>
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

            {/* Bottom Button (inside Paper) */}
            <Button
              variant="contained"
              size="small"
              color="success"
              onClick={() => handle_Route_1104()}
              sx={{ px: 5, width: "300px", mt: "auto" }}
              disabled={!selectedTo}
            >
              Generate Email Template
            </Button>
          </Paper>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Screen009;
