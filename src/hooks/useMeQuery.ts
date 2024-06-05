import request from "@/api/request";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useMeQuery() {
  return useSuspenseQuery({
    queryKey: ["user", "me"],
    queryFn: async () => {
      const response = await request<{
        id: string;
        username: string;
        email: string;
      }>("/user/me");
      return response.data;
    },
  });
}
