import { Suspense, useState } from "react";
import Title from "../../../components/Title";
import {
  NextButton,
  NextButtonStyle,
} from "../../new-appointment/components/NextButton";
import { MapView } from "../../new-appointment/map";

import styles from "./AddCategories.module.scss";
import { InputTags } from "@/components/ui/input-tags";
import { Button } from "@/components/ui/button";
import { useDraftStore } from "@/components/store/useDraftStore";

export function AddCategories() {
  const handleClick = () => {
    alert(JSON.stringify(useDraftStore.getState()));
  };

  const [categories, setCategories] = useState<string[]>([]);

  return (
    <>
      <Title>약속장소를 추가하세요</Title>

      <div className={styles.wrapper}>
        <Suspense fallback={<div>Loading...</div>}>
          <MapView />
        </Suspense>

        <div className={styles.inputWrapper}>
          <InputTags
            placeholder="카테고리를 입력해주세요."
            value={categories}
            onChange={setCategories}
          />
        </div>
      </div>

      <NextButton>
        <Button onClick={handleClick} className={NextButtonStyle}>
          완료
        </Button>
      </NextButton>
    </>
  );
}
