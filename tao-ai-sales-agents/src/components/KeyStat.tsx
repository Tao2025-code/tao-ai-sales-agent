import React from "react";
import { styles } from "../styles";

type KeyStatProps = {
  label: string;
  value: string;
};

export const KeyStat: React.FC<KeyStatProps> = ({ label, value }) => (
  <div style={styles.keystat}>
    <div style={styles.keystatValue}>{value}</div>
    <div style={styles.keystatLabel}>{label}</div>
  </div>
);

export default KeyStat;
