import Title from "../../components/Title";
import styles from "./Appointment.module.scss";

const appointment = {
  id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  title: "한도협의 약속",
  description: "한도협 휴직 기념 홈파티 그런데 이제 술과 돼지 바베큐를 곁들인",
  location: {},
  keywordList: ["홈파티", "술", "고기!"],
  participantList: ["홍길동", "김아무개"],
  status: "DRAFT",
  startTime: "2024-05-20T06:22:17.876Z",
  endTime: "2024-05-20T06:22:17.876Z",
  confirmTime: "2024-05-20T06:22:17.876Z",
};

export function Appointment() {
  return (
    <>
      <Title>{appointment.title}</Title>

      <section className={styles.information}>
        <p className={styles.description}>{appointment.description}</p>

        <label htmlFor="">장소</label>
        <input type="text" readOnly />

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
