import { Eventcalendar, setOptions } from "@mobiscroll/react";
import { useCallback, useMemo } from "react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import "./Calendar.css";
import { Box, Typography } from "@mui/material";

setOptions({
  theme: "ios",
  themeVariant: "light",
});

const Calendar = ({ agentList, myEvents, selectedDate, selectedAgent }) => {
  const colorMap = {
    different_location_event: { border: "#ff030b", background: "#f78387" },
    same_location_event: { border: "#0022ff", background: "#6378ff" },
    personal_event: { border: "#ff8c00", background: "#ffdd87" },
    unavailable_event: { border: "#000000", background: "#adadad" },
    new_bookings: { border: "#078700", background: "#adffa8" },
  };

  // Simulate API response or replace with fetch call

  const myView = useMemo(
    () => ({
      schedule: {
        type: "day",
        startTime: "06:00",
        endTime: "22:00",
        allDay: false,
        showControls: false,
        showTimeline: false,
        currentTimeIndicator: false,
      },
    }),
    []
  );

  const customScheduleEvent = useCallback((data) => {
    return (
      <div
        className="md-custom-event-cont"
        style={{
          borderRadius: "3px",
          border: "1px solid",
          background: data?.original.system_generated
            ? "#adadad"
            : colorMap[data?.original.event_type]?.background,
          borderColor: data?.original.system_generated
            ? "black"
            : colorMap[data?.original.event_type]?.border,
        }}
      >
        <div className="md-custom-event-wrapper">
          <div className="md-custom-event-details">
            <div className="md-custom-event-title">{data.title}</div>
            {!data?.original.system_generated && (
              <div className="md-custom-event-title">
                {data?.original.location_name}
              </div>
            )}
            <div className="md-custom-event-time">
              {data.start} - {data.end}
            </div>
          </div>
        </div>
      </div>
    );
  }, []);

  const customResource = useCallback(
    (resource) => (
      <Box>
        <Typography
          sx={{
            borderRadius:
              selectedAgent?.sales_agent_user_id === resource?.id && "6px",
            border:
              selectedAgent?.sales_agent_user_id === resource?.id &&
              "2px solid #005c03",
            bgcolor:
              selectedAgent?.sales_agent_user_id === resource?.id && "#02d909",
          }}
        >
          {resource.name}
        </Typography>
      </Box>
    ),
    [selectedAgent]
  );

  return (
    <div
      style={{
        height: "100%",
        overflow: "hidden", // ✅ disable scroll
        paddingTop: "5px",
      }}
      className="mbsc-grid mbsc-no-padding"
    >
      <div className="mbsc-row" style={{ height: "100%" }}>
        <div
          className="mbsc-col-sm-12 docs-appointment-calendar"
          style={{ height: "100%" }}
        >
          <Eventcalendar
            data={myEvents}
            view={myView}
            resources={agentList}
            selectedDate={selectedDate}
            renderScheduleEvent={customScheduleEvent}
            renderResource={customResource}
            renderHeader={() => null}
          />
        </div>
      </div>
    </div>
  );
};

export default Calendar;
