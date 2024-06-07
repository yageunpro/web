import React from "react";
import { Schedule } from "@/types/Schedule";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { isSameDay, isSameMonth, isSameYear } from "date-fns";

function formatDateTime(start: string, end: string) {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const startFormat = Intl.DateTimeFormat("ko-KR", {
    year: isSameYear(new Date(), startDate) ? undefined : "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  const endFormat = Intl.DateTimeFormat("ko-KR", {
    year: isSameYear(startDate, endDate) ? undefined : "numeric",
    month: isSameMonth(startDate, endDate) ? undefined : "short",
    day: isSameDay(startDate, endDate) ? undefined : "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return `${startFormat.format(startDate)} - ${endFormat.format(endDate)}`;
}

export function ScheduleList({ scheduleList }: { scheduleList?: Schedule[] }) {
  if (!scheduleList) {
    return null;
  }

  return (
    <ScrollArea className="px-3 pb-24 pt-0">
      <ul className="flex flex-col mt-4 gap-2">
        {scheduleList.map((schedule: Schedule, index: number) => {
          const isFirst = index === 0;

          return (
            <React.Fragment key={schedule.id}>
              {!isFirst && <Separator className="ml-3" />}
              <li className="ml-3 flex flex-col">
                <h3 className="text-lg font-bold">{schedule.title}</h3>

                <p>{formatDateTime(schedule.startTime, schedule.endTime)}</p>
              </li>
            </React.Fragment>
          );
        })}
      </ul>
    </ScrollArea>
  );
}
