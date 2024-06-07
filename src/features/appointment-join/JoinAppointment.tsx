import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useTakerStore } from "./useTakerStore";

export function JoinAppointment() {
  const { isSuccess } = useQuery({
    queryKey: ["user", "me"],
    queryFn: async () => {
      const response = await axios.get("/api/user/me");
      return response.data;
    },
  });

  useEffect(() => {
    if (isSuccess) {
      useTakerStore.setState({
        isMember: true,
      });
    }
  }, [isSuccess]);

  return <div>JoinAppointment</div>;
}
