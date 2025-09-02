import {
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import InfoIcon from "@mui/icons-material/Info";
import dayjs from "dayjs";
export default function Information1({ route_1106_data }) {
  return (
    <Paper sx={{ p: 4, mb: 1 }}>
      <Typography variant="h6" gutterBottom align="center" sx={{ pb: 1 }}>
        Follow Up Task Details
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <TextField
            sx={{ width: "250px" }}
            size="small"
            label="Follow Up Number"
            value={route_1106_data?.previous_task_details?.Follow_Up_Number}
            fullWidth
            disabled
          />
          <Tooltip title="Follow up number signifies the number of times a follow up task has been conducted for this deal">
            <IconButton>
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            sx={{ width: "250px" }}
            size="small"
            label="Task Subject"
            value={route_1106_data?.previous_task_details?.Subject}
            fullWidth
            disabled
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            sx={{ width: "250px" }}
            size="small"
            label="Task Owner"
            value={route_1106_data?.previous_task_details?.Owner?.name}
            fullWidth
            disabled
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            sx={{ width: "250px" }}
            size="small"
            label="Due Date"
            value={
              route_1106_data?.previous_task_details?.Due_Date
                ? dayjs(route_1106_data.previous_task_details.Due_Date).format(
                    "DD/MMM/YY"
                  )
                : "-"
            }
            fullWidth
            disabled
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            sx={{ width: "250px" }}
            size="small"
            label="Task Category"
            value={route_1106_data?.previous_task_details?.Task_Category}
            fullWidth
            disabled
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            size="small"
            label="Description"
            value={route_1106_data?.previous_task_details?.Description}
            fullWidth
            disabled
            multiline
            minRows={3}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
