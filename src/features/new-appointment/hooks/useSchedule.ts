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
      const queryString = new URLSearchParams({
        start: start,
        end: end,
      }).toString();

      // const response = await fetch(
      //   `/api/calendar/schedule/list?${queryString}`
      // );
      // return response.json();
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
