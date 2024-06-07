import { AppointmentListItem } from "./AppointmentListItem";
import { useAppointmentListQuery } from "@/hooks/useAppointmentListQuery";

import styles from "./AppointmentList.module.scss";

export function AppointmentList() {
  const { data: draftAppointments } = useAppointmentListQuery("DRAFT");
  const { data: confirmAppointments } = useAppointmentListQuery("CONFIRM");

  console.log(draftAppointments);
  console.log(confirmAppointments);

  const hasDraftAppointments = !!draftAppointments?.data.length;
  const hasConfirmAppointments = !!confirmAppointments?.data.length;

  return (
    <div className="pb-32">
      {hasDraftAppointments && (
        <section className={styles.section}>
          <h3>😴 약속 정하는 중</h3>
          <ul>
            {draftAppointments?.data?.map((appointment) => (
              <AppointmentListItem key={appointment.id} {...appointment} />
            ))}
          </ul>
        </section>
      )}

      {hasConfirmAppointments && (
        <section className={styles.section}>
          <h3>🕖 다가오는 약속</h3>
          <ul>
            {confirmAppointments?.data.map((appointment) => (
              <AppointmentListItem key={appointment.id} {...appointment} />
            ))}
          </ul>
        </section>
      )}

      {!hasDraftAppointments && !hasConfirmAppointments && (
        <div className="h-full flex items-center justify-center flex-col pb-32">
          <p className="text-secondary">아직 약속이 없어요.</p>
        </div>
      )}
    </div>
  );
}
