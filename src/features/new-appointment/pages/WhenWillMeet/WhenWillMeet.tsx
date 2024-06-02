import { Button } from "@/components/ui/button";
import Title from "../../../../components/Title";

import styles from "./WhenWillMeet.module.scss";
import { useDraftStore } from "@/components/store/useDraftStore";
import { useRef } from "react";
import { addMonths, addWeeks } from "date-fns";

export function WhenWillMeet() {
  const next = () => {
    window.location.hash = "2";
  };

  const currentDate = useRef(new Date()).current;

  return (
    <>
      <Title>언제 만날까요?</Title>

      <ul className={styles.list}>
        <Button
          variant="secondary"
          size="lg"
          onClick={() => {
            useDraftStore.setState({
              deadline: addWeeks(currentDate, 1),
            });
            next();
          }}
        >
          1주일 안에
        </Button>
        <Button
          variant="secondary"
          size="lg"
          onClick={() => {
            useDraftStore.setState({
              deadline: addWeeks(currentDate, 2),
            });
            next();
          }}
        >
          2주일 안에
        </Button>
        <Button
          variant="secondary"
          size="lg"
          onClick={() => {
            useDraftStore.setState({
              deadline: addMonths(currentDate, 1),
            });
            next();
          }}
        >
          한 달 안에
        </Button>
      </ul>
    </>
  );
}
