import Title from "../../components/Title";
import styles from "./Auth.module.scss";

export function Auth() {
  return (
    <div className={styles.wrapper}>
      <Title>로그인/회원가입</Title>
    </div>
  );
}
