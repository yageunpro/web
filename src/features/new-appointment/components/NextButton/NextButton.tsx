import { PropsWithChildren } from "react";
import styles from "./NextButton.module.scss";

export function NextButton({
  children,
  to,
  onClick,
}: PropsWithChildren<{
  to?: string;
  onClick?: () => void;
}>) {
  return (
    <div className={styles.wrapper}>
      {to && (
        <a href={to} className={styles.button}>
          {children}
        </a>
      )}
      {onClick && (
        <button onClick={onClick} className={styles.button}>
          {children}
        </button>
      )}
    </div>
  );
}
