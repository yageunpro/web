import { Suspense } from "react";
import Title from "../../../../components/Title";
import { NextButton, NextButtonStyle } from "../../components/NextButton";
import { MapView } from "../../map";
import { Input } from "../../../../components/Input";

import styles from "./AddCategories.module.scss";

export function AddCategories() {
  const handleClick = () => {
    alert("생성 API 내놔~!");
  };

  return (
    <>
      <Title>카테고리를 추가하세요</Title>

      <div className={styles.wrapper}>
        <div className={styles.inputWrapper}>
          <Input type="text" placeholder="카테고리를 입력해주세요." />
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <MapView />
        </Suspense>
      </div>

      <NextButton>
        <button onClick={handleClick} className={NextButtonStyle}>
          완료
        </button>
      </NextButton>
    </>
  );
}
