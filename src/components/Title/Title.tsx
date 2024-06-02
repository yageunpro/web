import styles from "./Title.module.scss";

export function Title({
  children,
  RightComponent,
}: {
  children: string;
  RightComponent?: React.ReactNode;
}) {
  return (
    <h1 className={styles.wrapper}>
      {children}
      {RightComponent && <div className={styles.right}>{RightComponent}</div>}
    </h1>
  );
}
