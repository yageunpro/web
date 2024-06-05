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
import { UserRoundIcon } from "lucide-react";

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

  const hasDraftAppointments = !!draftAppointments?.data.length;
  const hasConfirmAppointments = !!confirmAppointments?.data.length;

  return (
    <>
      <Title
        RightComponent={
          <Link
            to="/me"
            className={buttonVariants({
              size: "icon",
              variant: "ghost",
            })}
          >
            <UserRoundIcon size={20} />
          </Link>
        }
      >
        내 약속
      </Title>

      <div className={styles.wrapper}>
        {hasDraftAppointments && (
          <section>
            <h3>😴 약속 정하는 중</h3>
            <ul>
              {draftAppointments?.data?.map((appointment) => (
                <AppointmentListItem
                  key={appointment.id}
                  id={appointment.id}
                  title={appointment.title}
                  headCount={appointment.headCount}
                  location={appointment.location}
                />
              ))}
            </ul>
          </section>
        )}

        {hasConfirmAppointments && (
          <section>
            <h3>🕖 다가오는 약속</h3>
            <ul>
              {confirmAppointments?.data.map((appointment) => (
                <AppointmentListItem
                  key={appointment.id}
                  id={appointment.id}
                  title={appointment.title}
                  headCount={appointment.headCount}
                  location={appointment.location}
                />
              ))}
            </ul>
          </section>
        )}

        {!hasDraftAppointments && !hasConfirmAppointments && (
          <div className={styles.empty}>
            <p className="text-secondary">아직 약속이 없어요.</p>
          </div>
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
