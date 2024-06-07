import { Fragment, useRef } from "react";
import Title from "../../../components/Title";
import { NextButton } from "../components/NextButton";
import { useSchedule } from "../hooks/useSchedule";
import { Schedule } from "../../../types/Schedule";
import { NewSchedule } from "../components/NewSchedule/NewSchedule";
import { Separator } from "@/components/ui/separator";
import { isSameDay, isSameMonth, isSameYear } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import request from "@/api/request";

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

export function ExcludedSchedule() {
  const currentDate = useRef(new Date()).current;
  const nextWeek = useRef(
    new Date(currentDate.getTime() + 1000 * 60 * 60 * 24 * 7)
  ).current;

  const { data, refetch } = useSchedule({
    start: currentDate.toISOString(),
    end: nextWeek.toISOString(),
  });

  const { mutate } = useMutation({
    mutationFn: async (schedule: { title: string; start: Date; end: Date }) => {
      return request.post("/calendar/schedule", {
        title: schedule.title,
        startTime: schedule.start.toISOString(),
        endTime: schedule.end.toISOString(),
      });
    },
    onSuccess() {
      refetch();
    },
  });

  return (
    <>
      <Drawer>
        <Title
          RightComponent={
            <DrawerTrigger
              className={cn(
                "",
                buttonVariants({
                  variant: "ghost",
                })
              )}
            >
              <PlusIcon />
            </DrawerTrigger>
          }
        >
          아래 시간들은 제외할게요
        </Title>

        <NewSchedule
          onSubmitted={(schedule) => {
            mutate(schedule);
          }}
        />

        <ScrollArea className="px-3 pb-24">
          <ul className="flex flex-col mt-4 gap-2">
            {data &&
              data.data.map((schedule: Schedule, index: number) => {
                const isFirst = index === 0;

                return (
                  <Fragment key={schedule.id}>
                    {!isFirst && <Separator className="ml-3" />}
                    <li className="ml-3 flex flex-col">
                      <h3 className="text-lg font-bold">{schedule.title}</h3>

                      <p>
                        {formatDateTime(schedule.startTime, schedule.endTime)}
                      </p>
                    </li>
                  </Fragment>
                );
              })}
          </ul>
        </ScrollArea>

        <NextButton>
          <Link
            className={cn(
              buttonVariants({
                size: "lg",
              }),
              "self-stretch font-bold"
            )}
            to="/appointments/new/3"
          >
            다음
          </Link>
        </NextButton>
      </Drawer>
    </>
  );
}
