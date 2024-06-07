import { useRef } from "react";
import Title from "../../../components/Title";
import { NextButton } from "../components/NextButton";
import { useSchedule } from "../hooks/useSchedule";
import { NewSchedule } from "../components/NewSchedule/NewSchedule";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import request from "@/api/request";
import { ScheduleList } from "@/components/ScheduleList";

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

        {data && <ScheduleList scheduleList={data.data} />}

        <NextButton>
          <Link
            className={cn(
              buttonVariants({
                size: "lg",
              }),
              "self-stretch font-bold"
            )}
            to="/appointments/new/3"
            replace
          >
            다음
          </Link>
        </NextButton>

        <NewSchedule
          onSubmitted={(schedule) => {
            mutate(schedule);
          }}
        />
      </Drawer>
    </>
  );
}
