import { Button } from "@/components/ui/button";
import Title from "../../../../components/Title";

import styles from "./WhenWillMeet.module.scss";

export function WhenWillMeet() {
  const next = () => {
    window.location.hash = "2";
  };

  return (
    <>
      <Title>언제 만날까요?</Title>

      <ul className={styles.list}>
        <Button
          variant="secondary"
          size="lg"
          onClick={() => {
            next();
          }}
        >
          1주일 안에
        </Button>
        <Button
          variant="secondary"
          size="lg"
          onClick={() => {
            next();
          }}
        >
          2주일 안에
        </Button>
        <Button
          variant="secondary"
          size="lg"
          onClick={() => {
            next();
          }}
        >
          한 달 안에
        </Button>
      </ul>
    </>
  );
}
