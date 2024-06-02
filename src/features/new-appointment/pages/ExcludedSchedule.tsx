import { useRef } from "react";
import Title from "../../../components/Title";
import { NextButton, NextButtonStyle } from "../components/NextButton";
import { useSchedule } from "../hooks/useSchedule";
import { Schedule } from "../../../types/Schedule";
import { NewSchedule } from "../components/NewSchedule/NewSchedule";

export function ExcludedSchedule() {
  const currentDate = useRef(new Date()).current;
  const nextWeek = useRef(
    new Date(currentDate.getTime() + 1000 * 60 * 60 * 24 * 7)
  ).current;

  const { data } = useSchedule({
    start: currentDate.toISOString(),
    end: nextWeek.toISOString(),
  });

  console.log(data);

  return (
    <>
      <Title>아래 시간들은 제외할게요</Title>

      <NewSchedule
        onSubmitted={(schedule) => {
          console.log(schedule);
        }}
      />

      <ul>
        {data &&
          data.data.map((schedule: Schedule) => (
            <li key={schedule.id}>{schedule.title}</li>
          ))}
      </ul>

      <NextButton>
        <a className={NextButtonStyle} href="#3">
          다음
        </a>
      </NextButton>
    </>
  );
}
