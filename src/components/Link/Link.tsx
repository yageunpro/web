import { Link as BaseLink } from "react-router-dom";

import styles from "./Link.module.scss";
import { PropsWithChildren } from "react";

export function Link({ to, children }: PropsWithChildren<{ to: string }>) {
  return (
    <BaseLink to={to} className={styles.wrapper}>
      {children}
    </BaseLink>
  );
}
