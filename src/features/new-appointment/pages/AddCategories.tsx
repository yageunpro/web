import { Suspense } from "react";
import Title from "../../../components/Title";
import { NextButton, NextButtonStyle } from "../components/NextButton";
import { MapView } from "../map";
import { Input } from "../../../components/Input";

export function AddCategories() {
  const handleClick = () => {
    alert("생성 API 내놔~!");
  };

  return (
    <>
      <Title>카테고리를 추가하세요</Title>

      <Input type="text" />

      <Suspense fallback={<div>Loading...</div>}>
        <MapView />
      </Suspense>
      <NextButton>
        <button onClick={handleClick} className={NextButtonStyle}>
          완료
        </button>
      </NextButton>
    </>
  );
}
