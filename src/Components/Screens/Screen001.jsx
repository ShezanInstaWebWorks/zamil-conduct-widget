import {
  Box,
  Button,
  Paper,
  Grid2,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Information1 from "../Information/Information1";

const Screen001 = ({ route_1106_data, setScreen }) => {
  const handleBack = () => {
    setScreen("Screen001");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        bgcolor: "#CED4DA",
        display: "flex",
        justifyContent: "center",
        overflowY: "auto",
        boxSizing: "border-box",
        p: { xs: 1.5, sm: 3, md: 4 },
      }}
    >
      <Grid2
        container
        spacing={{ xs: 1, md: 2 }}
        sx={{ maxWidth: "1200px", width: "100%", mt: { xs: 1, md: 2 } }}
      >
        {/* Top bar with confirmation text and action */}
        <Grid2 size={{ xs: 12 }}>
          <Paper
            sx={{
              p: { xs: 1.5, sm: 2 },
              mb: { xs: 1, sm: 1.5 },
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "stretch", sm: "center" },
              gap: { xs: 1, sm: 2 },
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                flex: "1 1 auto",
                wordBreak: "break-word",
              }}
            >
              You Are Completing Task:{" "}
              {route_1106_data?.previous_task_details?.Subject || "—"}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              sx={{
                textTransform: "none",
                width: { xs: "100%", sm: "auto" },
                alignSelf: { xs: "stretch", sm: "center" },
              }}
              onClick={() => window.open(route_1106_data?.deal_link, "_blank")}
            >
              Open Deal Info In New Tab
            </Button>
          </Paper>
        </Grid2>

        {/* Left Section with Information1 */}
        <Grid2
          size={{ xs: 12, md: 4 }}
          sx={{ height: { md: "85%", xs: "auto" } }}
        >
          <Information1 route_1106_data={route_1106_data} />
        </Grid2>

        {/* Right Section with Contacts and Actions */}
        <Grid2 size={{ xs: 12, md: 8 }}>
          <Paper
            sx={{
              px: { xs: 2, sm: 3, md: 10 },
              py: { xs: 2.5, md: 4 },
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ textAlign: "center", color: "red" }}
            >
              Please call the customer to follow up on this deal
            </Typography>

            <Typography
              variant="h6"
              sx={{
                p: { xs: 1, md: 2 },
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Contacts Found
            </Typography>

            <TableContainer
              component={Paper}
              sx={{
                width: "100%",
                maxWidth: { xs: "100%", sm: 550 },
                mx: "auto",
                border: "1px solid",
                borderRadius: 0, // keep sharp edges
                maxHeight: { xs: 200, sm: 240 },
                overflowY: "auto",
                overflowX: "auto",
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
                    whiteSpace: "nowrap",
                  },
                }}
              >
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#fcebd5" }}>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Contact Name
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Contact Mobile
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {(route_1106_data?.contacts || []).map((contact, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {(contact?.First_Name || "") +
                          " " +
                          (contact?.Last_Name || "")}
                      </TableCell>
                      <TableCell>{contact?.Mobile || "—"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box
              sx={{
                width: "100%",
                mt: { xs: 3, md: 9 },
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: { xs: 1.5, sm: 2 },
                justifyContent: { xs: "stretch", sm: "space-between" },
              }}
            >
              <Button
                variant="contained"
                color="error"
                onClick={() => setScreen("Screen007")}
                sx={{ width: { xs: "100%", sm: "auto" } }}
              >
                Customer Did Not Answered
              </Button>

              <Button
                variant="contained"
                color="success"
                onClick={() => setScreen("Screen002")}
                sx={{ width: { xs: "100%", sm: 255 } }}
              >
                Customer Answered
              </Button>
            </Box>
          </Paper>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Screen001;
