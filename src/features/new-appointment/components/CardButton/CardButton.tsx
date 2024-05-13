import { PropsWithChildren } from "react";
import styles from "./CardButton.module.scss";

export function CardButton({
  children,
  to,
}: PropsWithChildren<{
  to?: string;
}>) {
  return (
    <a href={to} className={styles.wrapper}>
      {children}
    </a>
  );
}
