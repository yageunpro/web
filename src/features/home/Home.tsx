import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Title from "../../components/Title";
import styles from "./Home.module.scss";
import { cn } from "@/lib/utils";
import { AppointmentListItem } from "./AppointmentListItem";
import { NextButton } from "../new-appointment/components/NextButton";

export function Home() {
  return (
    <>
      <Title>내 약속</Title>

      <div className={styles.wrapper}>
        <section>
          <h3>😴 약속 정하는 중</h3>
          <ul>
            <AppointmentListItem
              id="12"
              title="약속 1"
              participantList={[]}
              location={{}}
            />
            <AppointmentListItem
              id="13"
              title="약속 2"
              participantList={[]}
              location={{}}
            />
          </ul>
        </section>
        <section>
          <h3>🕖 다가오는 약속</h3>
          <ul>
            <AppointmentListItem
              id="14"
              title="약속 3"
              participantList={["한도협", "홍길동"]}
              location={{}}
            />
            <AppointmentListItem
              id="15"
              title="약속 4"
              participantList={["한도협", "홍길동"]}
              location={{}}
            />
          </ul>
        </section>
      </div>

      <NextButton>
        <Link
          className={cn(
            buttonVariants({
              size: "lg",
            }),
            "self-stretch"
          )}
          to="/appointments/new"
        >
          새 약속 추가
        </Link>
      </NextButton>
    </>
  );
}
