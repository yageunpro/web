import Link from "../../components/Link";
import Title from "../../components/Title";
import styles from "./Auth.module.scss";

export function Auth() {
  return (
    <div className={styles.wrapper}>
      <Title>로그인/회원가입</Title>
      <ul className={styles.authList}>
        <li>
          <Link to="/auth/naver">네이버</Link>
        </li>
        <li>
          <Link to="/auth/google">Google</Link>
        </li>
      </ul>
    </div>
  );
}
