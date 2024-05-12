import Link from "../../components/Link";
import Title from "../../components/Title";
import styles from "./Home.module.scss";

export function Home() {
  return (
    <>
      <Title>내 약속</Title>

      <div className={styles.wrapper}>
        <Link to="/appointments/new">새 약속 추가</Link>

        <section>
          <h3>😴 약속 정하는 중</h3>
          <ul>
            <Link to="/appointments/1">약속 1</Link>
            <Link to="/appointments/2">약속 2</Link>
          </ul>
        </section>
        <section>
          <h3>🕖 다가오는 약속</h3>
          <ul>
            <Link to="/appointments/3">약속 3</Link>
            <Link to="/appointments/4">약속 4</Link>
          </ul>
        </section>
      </div>
    </>
  );
}
