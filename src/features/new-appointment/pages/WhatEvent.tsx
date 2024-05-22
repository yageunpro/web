import Title from "../../../components/Title";
import { NextButton, NextButtonStyle } from "../components/NextButton";

export function WhatEvent() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.location.hash = "4";
  };

  return (
    <>
      <Title>어떤 약속인가요?</Title>

      <form onSubmit={handleSubmit}>
        <label htmlFor="">이름</label>
        <input type="text" />

        <label htmlFor="">설명</label>
        <textarea name="" id="" cols={30} rows={10}></textarea>

        <NextButton>
          <button type="submit" className={NextButtonStyle}>
            다음
          </button>
        </NextButton>
      </form>
    </>
  );
}
