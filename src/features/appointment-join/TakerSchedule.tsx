import Title from "@/components/Title";
import { useTakerStore } from "./useTakerStore";
import { NextButton } from "../new-appointment/components/NextButton";
import { useNavigate, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { PlusIcon } from "lucide-react";
import { NewSchedule } from "../new-appointment/components/NewSchedule/NewSchedule";
import { useMutation } from "@tanstack/react-query";
import request from "@/api/request";
import { ScheduleList } from "@/components/ScheduleList";

export function TakerSchedule() {
  const navigate = useNavigate();

  const userName = useTakerStore((state) => state.userName);
  const scheduleList = useTakerStore((state) => state.scheduleList);

  const { mutate: join } = useMutation({
    mutationFn: async () => {
      return request.post(`/appointment/${appointmentId}/join/nonmember`, {
        username: userName,
        scheduleList,
      });
    },
    onSuccess() {
      navigate(`/appointments/${appointmentId}`, {
        replace: true,
      });
    },
  });

  const { appointmentId } = useParams();

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
          제외할 일정을 등록해주세요
        </Title>

        <NewSchedule
          onSubmitted={(schedule) => {
            useTakerStore.setState((state) => {
              return {
                ...state,
                scheduleList: [
                  ...state.scheduleList,
                  {
                    title: schedule.title,
                    startTime: schedule.start.toISOString(),
                    endTime: schedule.end.toISOString(),
                  },
                ],
              };
            });
          }}
        />

        <ScheduleList
          scheduleList={scheduleList.map((schedule, index) => ({
            ...schedule,
            id: index.toString(),
          }))}
        />

        <NextButton>
          <Button
            onClick={() => {
              join();
            }}
            size={"lg"}
            className={cn("w-full font-bold")}
          >
            참여
          </Button>
        </NextButton>
      </Drawer>
    </>
  );
}
