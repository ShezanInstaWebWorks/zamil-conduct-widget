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
            <Typography sx={{ width: "80%", fontWeight: "bold" }}>
              You Are Completing Task:{" "}
              {route_1106_data?.previous_task_details?.Subject}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              sx={{ width: "20%", textTransform: "none" }}
              onClick={() => window.open(route_1106_data?.deal_link, "_blank")}
            >
              Open Deal Info In New Tab
            </Button>

            <Box />
          </Paper>
        </Grid2>

        {/* Left Section with Information1 */}
        <Grid2 size={{ xs: 12, md: 4 }} sx={{ height: "85%" }}>
          <Information1 route_1106_data={route_1106_data} />
        </Grid2>

        {/* Right Section with Cancellation Reason and Confirmation */}
        <Grid2 size={{ xs: 12, md: 8 }}>
          <Paper sx={{ pr: 10, pl: 10, pt: 4, pb: 5 }}>
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
                p: 2,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Contacts Found
            </Typography>

            <TableContainer
              component={Paper}
              sx={{
                maxWidth: 550,
                mx: "auto",
                border: "1px solid", // outer border
                borderRadius: 0, // sharp edges
                maxHeight: 170, // ✅ fixed height
                overflowY: "auto", // ✅ enable vertical scroll if more rows
              }}
            >
              {/* Title before table */}

              <Table
                size="small"
                aria-label="simple table"
                stickyHeader // ✅ keeps header visible when scrolling
                sx={{
                  border: "1px solid",
                  borderCollapse: "collapse", // grid lines
                  "& th, & td": {
                    border: "1px solid",
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
                  {route_1106_data?.contacts?.map((contact, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {contact.First_Name} {contact.Last_Name}
                      </TableCell>
                      <TableCell>{contact.Mobile}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                mt: 11.5,
              }}
            >
              <Button
                variant="contained"
                onClick={() => setScreen("Screen007")}
                color="error"
              >
                Customer Did Not Answered
              </Button>

              <Button
                sx={{ width: 255 }}
                variant="contained"
                onClick={() => setScreen("Screen002")}
                color="success"
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
