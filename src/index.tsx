import { 
  staticClasses,
  ButtonItem
} from "@decky/ui";
import {
  addEventListener,
  removeEventListener,
  definePlugin,
  toaster
} from "@decky/api"
import { useEffect, useState } from "react";
import { FaBroadcastTower } from "react-icons/fa";
import { MQTTSettings } from "./components/settingSections/MQTTSettings";
import { BatterySettings } from "./components/settingSections/BatterySettings";
import { styles } from "./components/helpers/StyleHelper";

function Content() {
  const [allowAnonymous, setAllowAnonymous] = useState(false);
  const [MQTTAddress, setMQTTAddress] = useState("127.0.0.1");
  const [MQTTPort, setMQTTPort] = useState("1883");
  const [username, setUsername] = useState("Username");
  const [password, setPassword] = useState("Password");

  const [interval, setInterval] = useState(60);
  const [threshold, setThreshold] = useState(20);

  useEffect(() => {
    if (allowAnonymous) {
      setUsername("Username");
      setPassword("Password");
    }
  }, [allowAnonymous]);

  return (
    <>
      <MQTTSettings
        allowAnonymous={allowAnonymous}
        setAllowAnonymous={setAllowAnonymous}
        MQTTAddress={MQTTAddress}
        setMQTTAddress={setMQTTAddress}
        MQTTPort={MQTTPort}
        setMQTTPort={setMQTTPort}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />

      <BatterySettings
        threshold={threshold}
        setThreshold={setThreshold}
        interval={interval}
        setInterval={setInterval}
      />

      <div style={styles.submitButtonContainer}>
        <ButtonItem 
          bottomSeparator="none"
          highlightOnFocus={false}
        >
          Save Settings
        </ButtonItem>
      </div>
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
    name: "MQTT Battery Plugin",
    titleView: <div className={staticClasses.Title}>MQTT Battery Plugin</div>,
    // The content of your plugin's menu
    content: <Content />,
    // The icon displayed in the plugin list
    icon: <FaBroadcastTower />,
    // The function triggered when your plugin unloads
    onDismount() {
      console.log("Unloading")
      removeEventListener("timer_event", listener);
      // serverApi.routerHook.removeRoute("/decky-plugin-test");
    },
  };
});
