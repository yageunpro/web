import Title from "../../components/Title";
import styles from "./Appointment.module.scss";

export function Appointment() {
  return (
    <>
      <Title>내 약속</Title>
      <label htmlFor="">이름</label>
      <input type="text" />

      <label htmlFor="">설명</label>
      <textarea name="" id="" cols={30} rows={10}></textarea>

      <label htmlFor="">장소</label>
      <input type="text" />

      <label htmlFor="">카테고리</label>
      <input type="text" />

      <label htmlFor="">마감일</label>
      <input type="date" />

      <label htmlFor="">인원</label>
      <div>태그</div>
    </>
  );
}
