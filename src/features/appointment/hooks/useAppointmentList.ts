import { useQuery } from "@tanstack/react-query";

export function useAppointmentList() {
  return useQuery({
    queryKey: ["appointment", "list"],
    queryFn: async () => {
      const response = await fetch(`/api/appointment/list`);
      return response.json();
    },
  });
}
