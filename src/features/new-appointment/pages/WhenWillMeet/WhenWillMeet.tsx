import Title from "../../../../components/Title";
import { CardButton } from "../../components/CardButton";

import styles from "./WhenWillMeet.module.scss";

export function WhenWillMeet() {
  return (
    <>
      <Title>언제 만날까요?</Title>

      <ul className={styles.list}>
        <CardButton to="#2">1주일 안에</CardButton>
        <CardButton to="#2">2주일 안에</CardButton>
        <CardButton to="#2">한 달 안에</CardButton>
      </ul>
    </>
  );
}
