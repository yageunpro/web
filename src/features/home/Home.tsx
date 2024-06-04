import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Title from "../../components/Title";
import styles from "./Home.module.scss";
import { cn } from "@/lib/utils";
import { AppointmentListItem } from "./AppointmentListItem";
import { NextButton } from "../new-appointment/components/NextButton";
import { useQuery } from "@tanstack/react-query";
import { AppointmentStatus } from "@/types/AppointmentStatus";
import request from "@/api/request";

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

function useAppointmensQuery(status: AppointmentStatus) {
  return useQuery({
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

export function Home() {
  const { data: draftAppointments } = useAppointmensQuery("DRAFT");
  const { data: confirmAppointments } = useAppointmensQuery("CONFIRM");

  console.log(draftAppointments);
  console.log(confirmAppointments);

  return (
    <>
      <Title>내 약속</Title>

      <div className={styles.wrapper}>
        <section>
          <h3>😴 약속 정하는 중</h3>
          <ul>
            {draftAppointments?.data?.map((appointment) => (
              <AppointmentListItem
                id={appointment.id}
                title={appointment.title}
                headCount={appointment.headCount}
                location={appointment.location}
              />
            ))}
          </ul>
        </section>
        {(confirmAppointments?.data?.length ?? 0) > 0 && (
          <section>
            <h3>🕖 다가오는 약속</h3>
            <ul>
              {confirmAppointments?.data.map((appointment) => (
                <AppointmentListItem
                  id={appointment.id}
                  title={appointment.title}
                  headCount={appointment.headCount}
                  location={appointment.location}
                />
              ))}
            </ul>
          </section>
        )}
      </div>

      <NextButton>
        <Link
          className={cn(
            buttonVariants({
              size: "lg",
            }),
            "self-stretch"
          )}
          to="/appointments/new/1"
        >
          새 약속 추가
        </Link>
      </NextButton>
    </>
  );
}
