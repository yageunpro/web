import request from "@/api/request";
import { AppointmentStatus } from "@/types/AppointmentStatus";
import { useSuspenseQuery } from "@tanstack/react-query";

interface AppointmentListItem {
  id: string;
  title: string;
  headCount: number;
  confirmTime: string | null;
  status: AppointmentStatus;
  location: {
    address: string;
    category: string;
    id: string;
    position: [number, number];
    title: string;
  };
}

export function useAppointmentListQuery(status: AppointmentStatus) {
  return useSuspenseQuery({
    queryKey: [
      "appointments",
      {
        status,
      },
    ],
    queryFn: async () => {
      const response = await request.get<{
        data: AppointmentListItem[];
        nextToken: string | null;
      }>("/appointment/list", {
        params: {
          type: status,
        },
      });
      return response.data;
    },
  });
}
