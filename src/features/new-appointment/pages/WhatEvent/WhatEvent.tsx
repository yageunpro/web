import { Input, Textarea } from "../../../../components/Input";
import Title from "../../../../components/Title";
import { NextButton, NextButtonStyle } from "../../components/NextButton";
import styles from "./WhatEvent.module.scss";

export function WhatEvent() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.location.hash = "4";
  };

  return (
    <>
      <Title>어떤 약속인가요?</Title>

      <form className={styles.formWrapper} onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          <label htmlFor="">제목</label>
          <Input type="text" placeholder="약속 제목을 정해주세요" />
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="">설명</label>
          <Textarea
            name=""
            id=""
            cols={30}
            rows={6}
            placeholder="설명을 추가해주세요"
          />
        </div>

        <NextButton>
          <button type="submit" className={NextButtonStyle}>
            다음
          </button>
        </NextButton>
      </form>
    </>
  );
}
