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
  Tooltip,
  IconButton,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import RichText from "../RichText/RichText";
import InfoIcon from "@mui/icons-material/Info";

const Screen010 = ({
  route_1106_data,
  setSelectedTo,
  selectedTo,
  setSelectedCC,
  selectedCC,
  setScreen,
  calculatedDate,
  setEmailBodyContent,
  emailBodyContent,
  handle_Route_1104,
  handle_Route_1105,
  selectedTrail,
  setSelectedTrail,
  customSubject,
  setCustomSubject,
  subject,
  route1104Data,
}) => {
  const [editorReadyKey, setEditorReadyKey] = useState("rt-wait");

  console.log("subject", subject);
  const handleToChange = (contact) => {
    setSelectedTo((prev) => {
      if (prev?.email === contact.Email) {
        return null;
      }

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
      if (selectedTo?.email === email) return prev;

      return prev.includes(email)
        ? prev.filter((e) => e !== email)
        : [...prev, email];
    });
  };
  // Show selected trail first; else user's custom; else API default; else empty string
  const computedSubject = selectedTrail || customSubject || "";

  // 👇 trails come from the pre-fetched payload
  const trails = route1104Data?.common_email_trails ?? [];
  const uniqueTrails = Object.values(
    trails.reduce((acc, trail) => {
      if (
        !acc[trail.subject] ||
        new Date(trail.time) > new Date(acc[trail.subject].time)
      ) {
        acc[trail.subject] = trail;
      }
      return acc;
    }, {})
  );

  console.log("uniqueTrails", uniqueTrails);
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
              p: { xs: 1.5, md: 2 }, // smaller padding on mobile
              mb: 1,
              display: "flex",
              flexDirection: { xs: "column", md: "row" }, // stack on mobile
              justifyContent: { xs: "center", md: "space-between" },
              alignItems: { xs: "stretch", md: "center" },
              gap: { xs: 1, md: 0 },
            }}
          >
            {/* Left Button */}
            <Button
              onClick={() => setScreen("Screen009")}
              variant="contained"
              startIcon={<ArrowBackIcon />}
              sx={{
                textTransform: "none",
                width: { xs: "100%", md: "auto" }, // full width on mobile
                minWidth: { xs: 0, md: undefined },
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
                flexGrow: { xs: 0, md: 1 }, // only grow on desktop
                mx: { xs: 0, md: 18 }, // remove big margin on mobile
                my: { xs: 0.5, md: 0 },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  fontSize: { xs: "1rem", md: "1.25rem" }, // slightly smaller on mobile
                }}
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
                width: { xs: "100%", md: "auto" }, // full width on mobile
                minWidth: { xs: 0, md: undefined },
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
              p: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2, // compact spacing instead of large mb
              minHeight: 500,
            }}
          >
            {/* Email Trail Selector */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography>Use a common email trail?</Typography>

              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}
              >
                <TextField
                  select
                  size="small"
                  value={selectedTrail}
                  onChange={(e) => {
                    setSelectedTrail(e.target.value);
                    setCustomSubject(""); // clear manual input if trail selected
                  }}
                  sx={{ flex: 1, maxWidth: 450 }}
                  disabled={
                    !route1104Data?.common_email_trails ||
                    route1104Data.common_email_trails.length === 0
                  }
                >
                  {uniqueTrails.length > 0 ? (
                    uniqueTrails.map((trail, index) => (
                      <MenuItem key={index} value={trail.subject}>
                        {trail.subject}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No Items to Select</MenuItem>
                  )}
                </TextField>

                <Tooltip title="Select an email trail where you would like to add this follow up to.">
                  <IconButton size="small">
                    <InfoIcon fontSize="small" />
                  </IconButton>
                </Tooltip>

                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  disabled={
                    selectedTrail === "" ||
                    !route1104Data?.common_email_trails ||
                    route1104Data.common_email_trails.length === 0
                  } // ✅ disable when no selection
                  onClick={() => setSelectedTrail("")} // ✅ reset on click
                >
                  Start New Email Trail
                </Button>
              </Box>

              <Typography>Email Subject :</Typography>
              <TextField
                size="small"
                placeholder="Enter custom subject"
                value={computedSubject}
                onChange={(e) => {
                  setCustomSubject(e.target.value); // allow spaces!
                  setSelectedTrail(""); // typing clears the selected trail
                }}
                sx={{ maxWidth: 450 }}
                disabled={Boolean(selectedTrail)} // lock only when a trail is selected
                helperText=""
              />
            </Box>

            {/* RichText Editor */}
            <Box>
              <Typography sx={{ mb: 1 }}>Email Body :</Typography>
              <RichText
                key={editorReadyKey} // 👈 forces one-time re-mount
                emailBodyContent={emailBodyContent}
                setEmailBodyContent={setEmailBodyContent}
              />
            </Box>
          </Paper>
        </Grid2>

        {/* Right Section */}
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Paper
            sx={{
              p: 4,
              mb: 1,
              minHeight: "490px",
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

            <Typography sx={{ mt: 4, textAlign: "left" }}>
              Contacts Selected
            </Typography>

            <TableContainer
              component={Paper}
              sx={{
                maxWidth: 650,
                mx: "auto",
                border: "1px solid", // outer border
                borderRadius: 0, // sharp edges
                maxHeight: 400, // ✅ fixed height
                overflowY: "auto", // ✅ enable vertical scroll if more rows
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
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <Button
              variant="contained"
              size="small"
              color="success"
              onClick={() => handle_Route_1105()}
              sx={{ width: "300px", mt: "auto" }}
              disabled={!selectedTo}
            >
              Send Email & Create Next Follow Up
            </Button>
          </Paper>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Screen010;
