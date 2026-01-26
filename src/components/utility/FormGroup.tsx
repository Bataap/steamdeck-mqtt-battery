import { PanelSectionRow } from "@decky/ui";
import { styles } from "../helpers/StyleHelper";

type FormGroupProps = {
    children: React.ReactNode;
};

export function FormGroup({ children }: FormGroupProps) {
    return (
        <PanelSectionRow>
            <div style={styles.formGroup}>
                {children}
            </div>
        </PanelSectionRow>
    );
}