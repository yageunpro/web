import { Label } from "@/components/ui/label";
import Title from "../../components/Title";
import styles from "./Appointment.module.scss";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";

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

        <div className={styles.field}>
          <Label htmlFor="">장소</Label>
          <Input type="text" readOnly placeholder="장소를 추가하세요" />
        </div>

        <div className={styles.field}>
          <Label htmlFor="">카테고리</Label>
          <Input type="text" placeholder="카테고리를 추가하세요" />
        </div>

        <div className={styles.field}>
          <Label htmlFor="">마감일</Label>
          <Input
            type="date"
            value={format(new Date(appointment.endTime), "yyyy-MM-dd")}
          />
        </div>

        <Label htmlFor="">인원</Label>
        <div>태그</div>
        <div>태그</div>
        <div>태그</div>
      </section>
    </>
  );
}
