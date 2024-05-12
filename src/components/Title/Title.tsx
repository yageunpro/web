import styles from "./Title.module.scss";

export function Title({ children }: { children: string }) {
  return <h1 className={styles.wrapper}>{children}</h1>;
}
