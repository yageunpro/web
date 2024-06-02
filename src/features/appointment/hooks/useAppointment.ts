import { useQuery } from "@tanstack/react-query";

export function useAppointment(id: string) {
  return useQuery({
    queryKey: ["appointment", id],
    queryFn: async () => {
      const response = await fetch(`/api/appointment/${id}`);
      return response.json();
    },
  });
}
