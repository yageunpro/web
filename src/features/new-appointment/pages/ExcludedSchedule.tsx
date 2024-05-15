import Title from "../../../components/Title";
import { NextButton, NextButtonStyle } from "../components/NextButton";

export function ExcludedSchedule() {
  return (
    <>
      <Title>아래 시간들은 제외할게요</Title>
      <NextButton>
        <a className={NextButtonStyle} href="#3">
          다음
        </a>
      </NextButton>
    </>
  );
}
