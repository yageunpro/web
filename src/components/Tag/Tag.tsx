import { PropsWithChildren } from "react";
import styles from "./Tag.module.scss";

export function Tag({ children }: PropsWithChildren) {
  return <div className={styles.wrapper}>{children}</div>;
}
