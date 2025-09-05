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
      if (prev?.email === contact.Email) return null;
      setSelectedCC((ccPrev) =>
        ccPrev.filter((e) => e !== (contact.Email || ""))
      );
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
      if (selectedTo?.email === email) return prev;
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
        p: { xs: 2, sm: 4 }, // mobile: tighter padding
        boxSizing: "border-box",
      }}
    >
      <Grid2
        container
        spacing={1}
        sx={{ maxWidth: "1200px", width: "100%", mt: 2 }}
      >
        {/* Top bar with Back button and banner and Open Deal */}
        <Grid2 size={{ xs: 12 }}>
          <Paper
            sx={{
              p: { xs: 1.5, md: 2 }, // mobile: smaller padding
              mb: 1,
              display: "flex",
              flexDirection: { xs: "column", md: "row" }, // mobile: stack
              justifyContent: "space-between",
              alignItems: { xs: "stretch", md: "center" },
              gap: { xs: 1, md: 0 },
            }}
          >
            {/* Left Button */}
            <Button
              onClick={() => setScreen("Screen008")}
              variant="contained"
              startIcon={<ArrowBackIcon />}
              sx={{
                textTransform: "none",
                width: { xs: "100%", md: "auto" }, // mobile: full width
              }}
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
                flexGrow: 1,
                mx: { xs: 0, md: 18 }, // mobile: no side margin
                my: { xs: 0.5, md: 0 }, // mobile: small vertical spacing
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
              sx={{
                textTransform: "none",
                width: { xs: "100%", md: "auto" }, // mobile: full width
              }}
            >
              Open Deal Info In New Tab
            </Button>
          </Paper>
        </Grid2>

        {/* Left Section */}
        <Grid2 size={{ xs: 12, md: 8 }}>
          <Paper
            elevation={3}
            sx={{
              pr: { xs: 2, md: 5 },
              pl: { xs: 2, md: 5 },
              pt: { xs: 1.5, md: 2 },
              pb: { xs: 1.5, md: 2 },
              minHeight: { xs: "auto", md: "550px" }, // mobile: no forced height
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: { xs: 3, md: 6 },
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "16px", md: "18px" },
                  textAlign: "center",
                }}
              >
                Please Select The Contacts To Send The Follow Up Email To
              </Typography>
            </Box>

            <TableContainer
              component={Paper}
              sx={{
                maxWidth: { xs: "100%", sm: 650 }, // mobile: use full width
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
              p: { xs: 2, md: 4 }, // mobile: smaller padding
              mb: 1,
              minHeight: { xs: "auto", md: "520px" }, // mobile: no forced height
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Top Content (TextField) */}
            <Box sx={{ mt: 2, mb: 2, width: "100%" }}>
              <TextField
                id="outlined-followup-date"
                size="small"
                sx={{
                  width: { xs: "100%", sm: 300 }, // mobile: full width
                  "& .MuiInputBase-input": { textAlign: "center" },
                }}
                label="Next Follow Up Date"
                value={calculatedDate || ""}
                disabled
              />
            </Box>

            {/* Bottom Button (inside Paper) */}
            <Button
              variant="contained"
              size="small"
              color="success"
              onClick={() => handle_Route_1104()}
              sx={{
                px: { xs: 2, md: 5 },
                width: { xs: "100%", sm: 300 }, // mobile: full width
                mt: "auto",
                textTransform: "none",
              }}
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
