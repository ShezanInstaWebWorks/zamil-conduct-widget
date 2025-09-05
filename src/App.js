import { useEffect, useState } from "react";
import { Box, LinearProgress, Stack } from "@mui/material";
import "./App.css";
import ES001 from "./Components/Error Screens/ES001";
import Screen002 from "./Components/Screens/Screen002";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import Screen001 from "./Components/Screens/Screen001";
import Screen003 from "./Components/Screens/Screen003";
import Screen006 from "./Components/Screens/Screen006";
import Screen007 from "./Components/Screens/Screen007";
import Screen008 from "./Components/Screens/Screen008";
import ES005 from "./Components/Error Screens/ES005";
import ES006 from "./Components/Error Screens/ES006";
import ES002 from "./Components/Error Screens/ES002";
import Screen009 from "./Components/Screens/Screen009";
import Screen010 from "./Components/Screens/Screen010";

dayjs.extend(utc);
dayjs.extend(timezone);

const ZOHO = window.ZOHO;

function App() {
  const [initailLoading, setInitailLoading] = useState(true);
  const [notes, setNotes] = useState("");
  const [extensionNote, setExtensionNote] = useState("");
  const [followUpDueDate, setFollowUpDueDate] = useState("");
  const [calculatedDate, setCalculatedDate] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [recordData, setRecordData] = useState();
  const [errorResp, setErrorResp] = useState();
  const [screen, setScreen] = useState();
  const [nextLoading, setNextLoading] = useState(false);
  const [route_1106_data, setRoute_1106_data] = useState();
  const [selectedTo, setSelectedTo] = useState(null);
  const [selectedCC, setSelectedCC] = useState([]);
  const [emailBodyContent, setEmailBodyContent] = useState("");
  const [selectedTrail, setSelectedTrail] = useState("");
  const [customSubject, setCustomSubject] = useState("");
  const [route1104Data, setRoute1104Data] = useState(null);

  const subject = customSubject || selectedTrail;
  useEffect(() => {
    ZOHO.embeddedApp.on("PageLoad", async function (data) {
      let recordUniqueId = data?.EntityId?.[0];

      await ZOHO.CRM.API.getRecord({
        Entity: data?.Entity,
        RecordID: recordUniqueId,
      }).then(async function (data) {
        let record = data?.data?.[0];
        setRecordData(record);
        console.log("deal_record", record);

        // call route_1106 deluge function
        const func_name1 = "route_1106";
        await ZOHO.CRM.FUNCTIONS.execute(func_name1, {
          arguments: JSON.stringify({
            deal_id: recordUniqueId,
          }),
        }).then(function (resp_func_1) {
          console.log("resp_func_1", resp_func_1);
          setRoute_1106_data(resp_func_1);

          if (resp_func_1?.status != "success") {
            setErrorResp(resp_func_1);
            setScreen("ES001");
          } else if (resp_func_1?.previous_task_details === null) {
            setScreen("ES002");
          } else if (
            resp_func_1?.contacts === null ||
            resp_func_1?.contacts?.length === 0
          ) {
            setScreen("ES005");
          } else if (resp_func_1?.deal_status !== "Deal Open") {
            setScreen("ES006");
          } else {
            setScreen("Screen001");
          }
        });
      });

      setInitailLoading(false);
    });

    ZOHO.embeddedApp.init().then(() => {
      ZOHO.CRM.UI.Resize({ height: "80%", width: "85%" }).then(function (
        data
      ) {});
    });
  }, []);
  const getZohoUser = async () => {
    try {
      const userResp = await ZOHO.CRM.CONFIG.getCurrentUser();
      return userResp?.users?.[0] || null;
    } catch (error) {
      console.error("Error fetching Zoho user:", error);
      return null;
    }
  };

  const handle_Route_1101 = async () => {
    try {
      setInitailLoading(true);

      // ✅ Get Zoho user directly
      const currentUserData = await getZohoUser();

      const func_name_1101 = "route_1101";
      let paramsMap = {
        previous_task_details: (({ Task_Category, ...rest }) => rest)(
          route_1106_data?.previous_task_details || {}
        ),
        new_task_details: {
          due_date: dueDate,
        },
        user_details: {
          user_name: currentUserData?.full_name,
          user_email: currentUserData?.email,
          user_id: currentUserData?.id,
        },
        deal_id: recordData?.id,
        follow_up_notes: notes,
        reason_for_extension: extensionNote,
      };
      const resp = await ZOHO.CRM.FUNCTIONS.execute(func_name_1101, {
        arguments: JSON.stringify({ params: paramsMap }),
      });

      if (resp?.status !== "success") {
        setErrorResp(resp);
        setScreen("ES001");
        setInitailLoading(false);
      } else {
        setScreen("Screen006");
        setInitailLoading(false);
      }
    } catch (error) {
      console.error("Error in handle_Route_1101:", error);
      setErrorResp(error);
      setScreen("ES001");
      setInitailLoading(false);
    } finally {
      setInitailLoading(false);
    }
  };

  const handle_Route_1102 = async () => {
    try {
      setInitailLoading(true);

      const currentUserData = await getZohoUser();

      const func_name_1102 = "route_1102";
      let paramsMap = {
        previous_task_details: (({ Task_Category, ...rest }) => rest)(
          route_1106_data?.previous_task_details || {}
        ),
        new_task_details: {
          due_date: dueDate,
        },
        user_details: {
          user_name: currentUserData?.full_name,
          user_email: currentUserData?.email,
          user_id: currentUserData?.id,
        },
        deal_id: recordData?.id,
        follow_up_notes: notes,
      };
      const resp = await ZOHO.CRM.FUNCTIONS.execute(func_name_1102, {
        arguments: JSON.stringify({ params: paramsMap }),
      });

      if (resp?.status !== "success") {
        setErrorResp(resp);
        setScreen("ES001");
        setInitailLoading(false);
      } else {
        setScreen("Screen006");
        setInitailLoading(false);
      }
    } catch (error) {
      console.error("Error in handle_Route_1102:", error);
      setErrorResp(error);
      setScreen("ES001");
      setInitailLoading(false);
    } finally {
      setInitailLoading(false);
    }
  };

  const handle_Route_1103 = async () => {
    try {
      setNextLoading(true);

      const currentUserData = await getZohoUser();

      const func_name_1103 = "route_1103";
      let paramsMap = {
        previous_task_details: (({ Task_Category, ...rest }) => rest)(
          route_1106_data?.previous_task_details || {}
        ),
        new_task_details: {
          due_date: dayjs(calculatedDate, "DD/MMM/YY").format("YYYY-MM-DD"),
        },
        user_details: {
          user_name: currentUserData?.full_name,
          user_email: currentUserData?.email,
          user_id: currentUserData?.id,
        },
        deal_id: recordData?.id,
      };

      console.log("func_name_1103_param", paramsMap);

      const resp = await ZOHO.CRM.FUNCTIONS.execute(func_name_1103, {
        arguments: JSON.stringify({ params: paramsMap }),
      });

      console.log("func_1103_res", resp);

      if (resp?.status !== "success") {
        setErrorResp(resp);
        setScreen("ES001");
      } else {
        setScreen("Screen006");
      }
    } catch (error) {
      console.error("Error in handle_Route_1103:", error);
      setErrorResp(error);
      setScreen("ES001");
    } finally {
      setNextLoading(false);
    }
  };

  // keep your existing function name, just add the prefill lines
  const handle_Route_1104 = async () => {
    try {
      setNextLoading(true);

      const currentUserData = await getZohoUser();

      const func_name_1104 = "route_1104";
      const paramsMap = {
        deal_id: recordData?.id,
        contact_details: {
          name: selectedTo?.name,
          email: selectedTo?.email,
          id: selectedTo?.id,
        },
        user_email: currentUserData?.email,
        user_id: currentUserData?.id,
      };

      const resp = await ZOHO.CRM.FUNCTIONS.execute(func_name_1104, {
        arguments: JSON.stringify({ params: paramsMap }),
      });

      if (resp?.status !== "success") {
        setErrorResp(resp);
        setScreen("ES001");
        return null;
      }

      // 🔽 normalize if your payload nests under `details` (adjust if needed)
      const data = resp?.details ?? resp;

      // 🔒 cache for Screen010 props (trails etc.)
      setRoute1104Data(data);

      // ✅ prefill so Screen010 mounts with values already set
      if (data?.subject) setCustomSubject((prev) => prev || data.subject);
      if (data?.body) setEmailBodyContent((prev) => prev || data.body);

      setScreen("Screen010");
      return data; // optional
    } catch (error) {
      console.error("Error in handle_Route_1104:", error);
      setErrorResp(error);
      setScreen("ES001");
      return null;
    } finally {
      setNextLoading(false);
    }
  };

  const handle_Route_1105 = async () => {
    try {
      setNextLoading(true);

      const currentUserData = await getZohoUser();

      const func_name_1105 = "route_1105";

      let paramsMap = {
        subject: subject,
        body: emailBodyContent,
        to_email: selectedTo?.email,
        cc_emails: selectedCC,
        deal_id: recordData?.id,
        previous_task_details: (({ Task_Category, ...rest }) => rest)(
          route_1106_data?.previous_task_details || {}
        ),
        new_task_details: {
          due_date: dayjs(calculatedDate, "DD/MMM/YY").format("YYYY-MM-DD"),
        },
        user_details: {
          user_name: currentUserData?.full_name,
          user_email: currentUserData?.email,
          user_id: currentUserData?.id,
        },
      };

      console.log("func_name_1105_param", paramsMap);

      const resp = await ZOHO.CRM.FUNCTIONS.execute(func_name_1105, {
        arguments: JSON.stringify({ params: paramsMap }),
      });

      console.log("func_1105_res", resp);

      if (resp?.status !== "success") {
        setErrorResp(resp);
        setScreen("ES001");
      } else {
        setScreen("Screen006");
      }
    } catch (error) {
      console.error("Error in handle_Route_1105:", error);
      setErrorResp(error);
      setScreen("ES001");
    } finally {
      setNextLoading(false);
    }
  };

  const handleCloseWidget = async () => {
    await ZOHO.CRM.UI.Popup.close().then(function (data) {});
  };
  if (initailLoading) {
    return (
      <Box
        sx={{
          textAlign: "center",
          mt: 13,
          mx: 10,
        }}
      >
        <Stack sx={{ width: "100%", color: "grey.500" }} spacing={5}>
          <LinearProgress color="secondary" />
          <LinearProgress color="success" />
          <LinearProgress color="inherit" />
        </Stack>
      </Box>
    );
  }

  return (
    <Box>
      {screen === "Screen001" && (
        <Screen001 route_1106_data={route_1106_data} setScreen={setScreen} />
      )}
      {screen === "Screen002" && (
        <Screen002
          setScreen={setScreen}
          notes={notes}
          setNotes={setNotes}
          route_1106_data={route_1106_data}
        />
      )}
      {screen === "Screen003" && (
        <Screen003
          setScreen={setScreen}
          followUpDueDate={followUpDueDate}
          setFollowUpDueDate={setFollowUpDueDate}
          setDueDate={setDueDate}
          dueDate={dueDate}
          extensionNote={extensionNote}
          setExtensionNote={setExtensionNote}
          route_1106_data={route_1106_data}
          handle_Route_1101={handle_Route_1101}
          handle_Route_1102={handle_Route_1102}
        />
      )}
      {screen === "Screen006" && (
        <Screen006 route_1106_data={route_1106_data} />
      )}
      {screen === "Screen007" && (
        <Screen007
          setScreen={setScreen}
          followUpDueDate={followUpDueDate}
          setFollowUpDueDate={setFollowUpDueDate}
          calculatedDate={calculatedDate}
          setCalculatedDate={setCalculatedDate}
          route_1106_data={route_1106_data}
          handle_Route_1102={handle_Route_1102}
        />
      )}
      {screen === "Screen008" && (
        <Screen008
          setScreen={setScreen}
          followUpDueDate={followUpDueDate}
          setFollowUpDueDate={setFollowUpDueDate}
          calculatedDate={calculatedDate}
          setCalculatedDate={setCalculatedDate}
          route_1106_data={route_1106_data}
          handle_Route_1103={handle_Route_1103}
        />
      )}
      {screen === "Screen009" && (
        <Screen009
          setScreen={setScreen}
          followUpDueDate={followUpDueDate}
          setFollowUpDueDate={setFollowUpDueDate}
          calculatedDate={calculatedDate}
          setCalculatedDate={setCalculatedDate}
          route_1106_data={route_1106_data}
          handle_Route_1104={handle_Route_1104}
          setSelectedTo={setSelectedTo}
          selectedTo={selectedTo}
          setSelectedCC={setSelectedCC}
          selectedCC={selectedCC}
        />
      )}

      {screen === "Screen010" && (
        <Screen010
          setScreen={setScreen}
          followUpDueDate={followUpDueDate}
          setFollowUpDueDate={setFollowUpDueDate}
          calculatedDate={calculatedDate}
          setCalculatedDate={setCalculatedDate}
          route_1106_data={route_1106_data}
          route1104Data={route1104Data}
          handle_Route_1104={handle_Route_1104}
          handle_Route_1105={handle_Route_1105}
          setSelectedTo={setSelectedTo}
          selectedTo={selectedTo}
          setSelectedCC={setSelectedCC}
          selectedCC={selectedCC}
          setEmailBodyContent={setEmailBodyContent}
          emailBodyContent={emailBodyContent}
          setSelectedTrail={setSelectedTrail}
          selectedTrail={selectedTrail}
          setCustomSubject={setCustomSubject}
          customSubject={customSubject}
          subject={subject}
        />
      )}
      {screen === "ES001" && <ES001 errorResp={errorResp} />}
      {screen === "ES002" && <ES002 />}
      {screen === "ES005" && <ES005 />}
      {screen === "ES006" && <ES006 />}
    </Box>
  );
}

export default App;
