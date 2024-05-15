import { PropsWithChildren } from "react";
import styles from "./NextButton.module.scss";

export function NextButton({
  children,
}: PropsWithChildren<{
  to?: string;
  onClick?: () => void;
}>) {
  return <div className={styles.wrapper}>{children}</div>;
}

export const NextButtonStyle = styles.button;
