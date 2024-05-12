import styles from "./Title.module.scss";

export function Title({ title }: { title: string }) {
  return <h1 className={styles.wrapper}>{title}</h1>;
}
