import Title from "../../components/Title";
import styles from "./Appointment.module.scss";

export function Appointment() {
  return (
    <>
      <Title>한도협의 약속</Title>

      <section className={styles.information}>
        <p className={styles.description}>
          한도협 휴직 기념 홈파티 그런데 이제 술과 돼지 바베큐를 곁들인
        </p>

        <label htmlFor="">장소</label>
        <input type="text" />

        <label htmlFor="">카테고리</label>
        <input type="text" />

        <label htmlFor="">마감일</label>
        <input type="date" />

        <label htmlFor="">인원</label>
        <div>태그</div>
        <div>태그</div>
        <div>태그</div>
      </section>
    </>
  );
}
