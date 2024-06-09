import request from "@/api/request";
import { useQuery } from "@tanstack/react-query";

export function useSchedule({ start, end }: { start: string; end: string }) {
  return useQuery({
    queryKey: [
      "calendar",
      "schedule",
      "list",
      {
        start: start,
        end: end,
      },
    ],
    queryFn: async () => {
      const response = await request.get(`/calendar/schedule/list`, {
        params: {
          start: start,
          end: end,
        },
      });

      console.log(response.data);

      return response.data;
    },
  });
}
