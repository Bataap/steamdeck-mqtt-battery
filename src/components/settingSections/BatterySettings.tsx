import { PanelSection, SliderField } from "@decky/ui";

type BatterySettingsProps = {
    threshold: number;
    interval: number;
    setThreshold: (value: number) => void;
    setInterval: (value: number) => void;
};

export function BatterySettings({ threshold, interval, setThreshold, setInterval }: BatterySettingsProps) {
    return (
        <PanelSection title="Battery Settings">
            <SliderField
                label="Low battery threshold (%)"
                min={5}
                max={50}
                step={1}
                showValue={true}
                value={threshold}
                onChange={setThreshold}
            />

            <SliderField
                label="Publish Interval (seconds)"
                min={10}
                max={300}
                step={10}
                showValue={true}
                value={interval}
                onChange={setInterval}
            />  
        </PanelSection>
    );
}