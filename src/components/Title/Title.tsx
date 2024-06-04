import React from "react";
import styles from "./Title.module.scss";

export function Title({
  children,
  RightComponent,
}: {
  children?: React.ReactNode;
  RightComponent?: React.ReactNode;
}) {
  return (
    <h1 className={styles.wrapper}>
      {children}
      {RightComponent && <div className={styles.right}>{RightComponent}</div>}
    </h1>
  );
}
