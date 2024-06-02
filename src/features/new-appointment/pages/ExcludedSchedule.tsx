import { useRef } from "react";
import Title from "../../../components/Title";
import { NextButton, NextButtonStyle } from "../components/NextButton";
import { useSchedule } from "../hooks/useSchedule";
import { Schedule } from "../../../types/Schedule";

export function ExcludedSchedule() {
  const currentDate = useRef(new Date()).current;
  const nextWeek = useRef(
    new Date(currentDate.getTime() + 1000 * 60 * 60 * 24 * 7)
  ).current;

  const { data } = useSchedule({
    start: currentDate.toISOString(),
    end: nextWeek.toISOString(),
  });

  return (
    <>
      <Title>아래 시간들은 제외할게요</Title>

      <button>추가 일정 등록하기</button>

      <ul>
        {data?.data.map((schedule: Schedule) => (
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
