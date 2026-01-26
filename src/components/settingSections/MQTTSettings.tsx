import { 
    PanelSection, 
    PanelSectionRow, 
    ToggleField,
    TextField 
} from "@decky/ui";
import { FormGroup } from "../utility/FormGroup";

type MQTTSettingsProps = {
  allowAnonymous: boolean;
  MQTTAddress: string;
  MQTTPort: string;
  username: string;
  password: string;
  setAllowAnonymous: (v: boolean) => void;
  setMQTTAddress: (v: string) => void;
  setMQTTPort: (v: string) => void;
  setUsername: (v: string) => void;
  setPassword: (v: string) => void;
};

export function MQTTSettings(props: MQTTSettingsProps) {
  const {
    allowAnonymous,
    setAllowAnonymous,
    MQTTAddress,
    setMQTTAddress,
    MQTTPort,
    setMQTTPort,
    username,
    setUsername,
    password,
    setPassword,
  } = props;

  return (
    <PanelSection title="MQTT Configuration">
      <PanelSectionRow>
        <ToggleField
          label="Allow Anonymous Connections"
          checked={allowAnonymous}
          onChange={setAllowAnonymous}
        />
      </PanelSectionRow>

      <FormGroup>
        <TextField
          label="MQTT Broker Address"
          value={MQTTAddress}
          onChange={(e) => setMQTTAddress(e.target.value)}
        />

        <TextField
          label="MQTT Port"
          mustBeNumeric
          value={MQTTPort}
          onChange={(e) => setMQTTPort(e.target.value)}
        />

        {!allowAnonymous && (
          <>
            <TextField
              label="MQTT Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
              label="MQTT Password"
              value={password}
              bIsPassword
              onChange={(e) => setPassword(e.target.value)}
            />
          </>
        )}
      </FormGroup>
    </PanelSection>
  );
}