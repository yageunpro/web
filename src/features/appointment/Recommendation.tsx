import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { NextButton } from "../new-appointment/components/NextButton";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { AppointmentModel } from "@/types/AppointmentModel";
import request from "@/api/request";

export function Recommendation({ appointmentId }: { appointmentId?: string }) {
  const { data } = useQuery({
    queryKey: ["recommendation", appointmentId, "recommend"],
    queryFn: async () => {
      const response = await request.get<AppointmentModel>(
        `/appointment/${appointmentId}/recommend`
      );
      return response.data;
    },
    enabled: !!appointmentId,
  });

  console.log(data);

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
            "self-stretch"
          )}
        >
          약속 확정하기
        </DrawerTrigger>
      </NextButton>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>아래 시간에 만나는 것을 추천드려요</DrawerTitle>
        </DrawerHeader>

        <Button variant="outline">1</Button>
      </DrawerContent>
    </Drawer>
  );
}
