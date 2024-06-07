import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import request from "@/api/request";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Title from "@/components/Title";

export function JoinAppointment() {
  const navigate = useNavigate();

  const { appointmentId } = useParams();

  const { mutate: join } = useMutation({
    mutationFn: async () => {
      return request.post(`/appointment/${appointmentId}/join`);
    },
    onSuccess() {
      navigate(`/appointments/${appointmentId}`);
    },
  });

  const { isSuccess: loggedIn } = useQuery({
    queryKey: ["user", "me"],
    queryFn: async () => {
      const response = await axios.get("/api/user/me");
      return response.data;
    },
  });

  useEffect(() => {
    if (loggedIn) {
      join();
    }
  }, [join, loggedIn]);

  return (
    <>
      <Title>로그인/회원가입</Title>

      <ul className="flex flex-col p-4 gap-2">
        <a
          className={cn(
            buttonVariants({
              variant: "outline",
              size: "lg",
            }),
            "w-full"
          )}
          href={`/api/auth/oauth/google?ref=${window.location.href}`}
        >
          Google로 로그인
        </a>

        <Link
          to={`/appointments/${appointmentId}/join/annonymous/name`}
          replace
          className={cn(
            buttonVariants({
              variant: "outline",
              size: "lg",
            })
          )}
        >
          비회원으로 계속하기
        </Link>
      </ul>
    </>
  );
}
