import { buttonVariants } from "@/components/ui/button";
import {
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useState } from "react";
import { Input } from "@/components/ui/input";

import styles from "./NewSchedule.module.scss";
import { addHours, format, roundToNearestMinutes } from "date-fns";

export function NewSchedule({
  onSubmitted,
}: {
  onSubmitted?: (schedule: { title: string; start: Date; end: Date }) => void;
}) {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState<Date>(
    roundToNearestMinutes(new Date(), { roundingMethod: "ceil", nearestTo: 30 })
  );
  const [endDate, setEndDate] = useState<Date>(addHours(startDate, 1));

  const handleStartDateTimeChange = (date: Date) => {
    const duration = endDate.getTime() - startDate.getTime();
    setStartDate(date);
    setEndDate(new Date(date.getTime() + duration));
  };

  const reset = () => {
    setTitle("");
    const newStartDate = roundToNearestMinutes(new Date(), {
      roundingMethod: "ceil",
      nearestTo: 30,
    });
    setStartDate(newStartDate);
    setEndDate(addHours(newStartDate, 1));
  };

  const rangeError = startDate >= endDate;
  const disabled = rangeError || !title;

  return (
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>일정 직접 추가</DrawerTitle>
      </DrawerHeader>

      <div className="flex flex-col px-4 py-2 gap-3">
        <Input
          placeholder="어떤 일정인가요?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className={styles.dateTimeWrapper}>
          <label id="rangeStart">시작</label>

          <div className={styles.inputs}>
            <Input
              type="date"
              aria-labelledby="rangeStart"
              className="w-[128px] shrink-0"
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
              className="w-[96px] shrink-0"
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
              className="w-[128px] shrink-0"
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
              className="w-[96px] shrink-0"
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
      </div>
      <DrawerFooter>
        <DrawerClose
          className={buttonVariants({
            size: "lg",
          })}
          onClick={() => {
            reset();
            onSubmitted?.({
              title,
              start: startDate,
              end: endDate,
            });
          }}
          disabled={disabled}
        >
          일정 추가
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );
}
