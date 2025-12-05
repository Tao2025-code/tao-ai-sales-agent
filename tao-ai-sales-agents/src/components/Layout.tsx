import React from "react";
import { styles } from "../styles";

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

export const Section: React.FC<SectionProps> = ({ title, children }) => (
  <section style={styles.section}>
    <h2 style={styles.h2}>{title}</h2>
    {children}
  </section>
);

type CardProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};

export const Card: React.FC<CardProps> = ({ children, style }) => (
  <div style={{ ...styles.card, ...style }}>{children}</div>
);
