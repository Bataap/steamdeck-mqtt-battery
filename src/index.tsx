import {
  ButtonItem,
  PanelSection,
  PanelSectionRow,
  TextField,
  ToggleField,
  SliderField,
  staticClasses
} from "@decky/ui";
import {
  addEventListener,
  removeEventListener,
  definePlugin,
  toaster
} from "@decky/api"
import { useEffect, useState } from "react";
import { FaShip } from "react-icons/fa";

function Content() {
  const [allowAnonymous, setAllowAnonymous] = useState(false);
  const [MQTTAddress, setMQTTAddress] = useState("127.0.0.1");
  const [MQTTPort, setMQTTPort] = useState("1883");
  const [username, setUsername] = useState("username");
  const [password, setPassword] = useState("");

  const [interval, setInterval] = useState(60);
  const [threshold, setThreshold] = useState(20);

  useEffect(() => {
    if (allowAnonymous) {
      setUsername("username");
      setPassword("password");
    }
  });

  return (
    <>
     <PanelSection title="MQTT Configuration">
      <PanelSectionRow>
        <ToggleField
          label="Allow Anonymous Connections"
          checked={allowAnonymous}
          onChange={setAllowAnonymous}
        />
      </PanelSectionRow>

      <PanelSectionRow>
        <TextField
          label="MQTT Broker Address"
          value={MQTTAddress}
          onChange={(e) => setMQTTAddress(e.target.value)}
        />
      </PanelSectionRow>
      
      <PanelSectionRow>
        <TextField
          label="MQTT Port"
          mustBeNumeric={true}
          value={MQTTPort}
          onChange={(e) => setMQTTPort(e.target.value)}
        />
      </PanelSectionRow>
      
      {!allowAnonymous && (
        <>
        <PanelSectionRow>
          <TextField
            label="MQTT Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </PanelSectionRow>
      
        <PanelSectionRow>
          <TextField
            label="MQTT Password"
            value={password}
            bIsPassword={true}
            onChange={(e) => setPassword(e.target.value)}
          />
        </PanelSectionRow>
        </>
      )}
    </PanelSection>

    <PanelSection title="Battery Settings">
      <PanelSectionRow>
        <SliderField
          label="Low battery threshold (%)"
          min={5}
          max={50}
          step={1}
          showValue={true}
          value={threshold}
          onChange={setThreshold}
        />
      </PanelSectionRow>

      <PanelSectionRow>
        <SliderField
          label="Update interval (seconds)"
          min={30}
          max={600}
          step={10}
          showValue={true}
          value={interval}
          onChange={setInterval}
        />
      </PanelSectionRow>

      <PanelSectionRow>
        <ButtonItem>
          Save Settings
        </ButtonItem>
      </PanelSectionRow>
    </PanelSection>

      {/* <PanelSectionRow>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={logo} />
        </div>
      </PanelSectionRow> */}
    </>
  );
};

export default definePlugin(() => {
  console.log("Template plugin initializing, this is called once on frontend startup")

  // serverApi.routerHook.addRoute("/decky-plugin-test", DeckyPluginRouterTest, {
  //   exact: true,
  // });

  // Add an event listener to the "timer_event" event from the backend
  const listener = addEventListener<[
    test1: string,
    test2: boolean,
    test3: number
  ]>("timer_event", (test1, test2, test3) => {
    console.log("Template got timer_event with:", test1, test2, test3)
    toaster.toast({
      title: "template got timer_event",
      body: `${test1}, ${test2}, ${test3}`
    });
  });

  return {
    // The name shown in various decky menus
    name: "Test Plugin",
    // The element displayed at the top of your plugin's menu
    titleView: <div className={staticClasses.Title}>Decky Example Plugin</div>,
    // The content of your plugin's menu
    content: <Content />,
    // The icon displayed in the plugin list
    icon: <FaShip />,
    // The function triggered when your plugin unloads
    onDismount() {
      console.log("Unloading")
      removeEventListener("timer_event", listener);
      // serverApi.routerHook.removeRoute("/decky-plugin-test");
    },
  };
});
