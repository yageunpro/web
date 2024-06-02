import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useState } from "react";
import { Input } from "@/components/ui/input";

import styles from "./NewSchedule.module.scss";
import { addHours, format, roundToNearestMinutes } from "date-fns";

export function NewSchedule() {
  const [startDate, setStartDate] = useState<Date>(
    roundToNearestMinutes(new Date(), { roundingMethod: "ceil", nearestTo: 30 })
  );
  const [endDate, setEndDate] = useState<Date>(addHours(startDate, 1));

  console.log(startDate);

  const handleStartDateTimeChange = (date: Date) => {
    const duration = endDate.getTime() - startDate.getTime();
    setStartDate(date);
    setEndDate(new Date(date.getTime() + duration));
  };

  return (
    <Drawer>
      <DrawerTrigger>
        <Button>일정 직접 추가하기</Button>
      </DrawerTrigger>

      <DrawerContent>
        <Input placeholder="어떤 일정인가요?" />

        <div className={styles.dateTimeWrapper}>
          <label id="rangeStart">시작</label>

          <div className={styles.inputs}>
            <Input
              type="date"
              aria-labelledby="rangeStart"
              value={format(startDate, "yyyy-MM-dd")}
              onChange={(e) => {
                const date = new Date(e.target.value);
                handleStartDateTimeChange(
                  new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate(),
                    startDate.getHours(),
                    startDate.getMinutes()
                  )
                );
              }}
            />
            <Input
              type="time"
              aria-labelledby="rangeStart"
              value={format(startDate, "HH:mm")}
              onChange={(e) => {
                const time = e.target.value.split(":");
                handleStartDateTimeChange(
                  new Date(
                    startDate.getFullYear(),
                    startDate.getMonth(),
                    startDate.getDate(),
                    parseInt(time[0]),
                    parseInt(time[1])
                  )
                );
              }}
            />
          </div>
        </div>

        <div className={styles.dateTimeWrapper}>
          <label id="rangeEnd">종료</label>

          <div className={styles.inputs}>
            <Input
              type="date"
              aria-labelledby="rangeEnd"
              value={format(endDate, "yyyy-MM-dd")}
              onChange={(e) => {
                const date = new Date(e.target.value);
                setEndDate(
                  (origin) =>
                    new Date(
                      date.getFullYear(),
                      date.getMonth(),
                      date.getDate(),
                      origin.getHours(),
                      origin.getMinutes()
                    )
                );
              }}
            />
            <Input
              type="time"
              aria-labelledby="rangeEnd"
              value={format(endDate, "HH:mm")}
              onChange={(e) => {
                const time = e.target.value.split(":");
                setEndDate(
                  (origin) =>
                    new Date(
                      origin.getFullYear(),
                      origin.getMonth(),
                      origin.getDate(),
                      parseInt(time[0]),
                      parseInt(time[1])
                    )
                );
              }}
            />
          </div>
        </div>

        <DrawerFooter>
          <DrawerClose>
            <Button onClick={() => {}}>일정 추가</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
