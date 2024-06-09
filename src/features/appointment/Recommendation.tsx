import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { NextButton } from "../new-appointment/components/NextButton";
import { cn, prettyDate } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import request from "@/api/request";

function useRecommendationQuery(appointmentId?: string) {
  return useQuery({
    queryKey: ["recommendation", appointmentId, "recommend"],
    enabled: !!appointmentId,
    queryFn: async () => {
      const response = await request.get<string[]>(
        `/appointment/${appointmentId}/recommend`
      );
      return response.data;
    },
  });
}

export function Recommendation({
  appointmentId,
  onConfirm,
}: {
  appointmentId?: string;
  onConfirm?: () => void;
}) {
  const { data } = useRecommendationQuery(appointmentId);
  console.log(data);
  const { mutate } = useMutation({
    mutationFn: async (date: string) => {
      return request.post(`/appointment/${appointmentId}/confirm`, {
        time: date,
      });
    },
    onSuccess: () => {
      onConfirm?.();
    },
  });

  const handleClickDatetime = (date: string) => () => {
    mutate(date);
  };

  if (!appointmentId) {
    return null;
  }

  return (
    <Drawer>
      <NextButton>
        <DrawerTrigger
          className={cn(
            buttonVariants({
              size: "lg",
            }),
            "self-stretch font-bold"
          )}
        >
          약속 확정하기
        </DrawerTrigger>
      </NextButton>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>아래 시간에 만나는 것을 추천드려요</DrawerTitle>
        </DrawerHeader>

        <ul className="flex flex-col gap-2 p-3">
          {/* <Button variant="outline">1</Button> */}
          {data?.map((time) => (
            <DrawerClose
              className={buttonVariants({
                variant: "outline",
                size: "lg",
              })}
              onClick={handleClickDatetime(time)}
            >
              {prettyDate(new Date(time))}
            </DrawerClose>
          ))}
        </ul>
      </DrawerContent>
    </Drawer>
  );
}
