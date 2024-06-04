import { Label } from "@/components/ui/label";
import Title from "../../components/Title";
import styles from "./Appointment.module.scss";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { MoreVerticalIcon, PersonStandingIcon } from "lucide-react";
import { AppointmentModel } from "@/types/AppointmentModel";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useState } from "react";

export function Appointment() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const isNew = searchParams.get("new"); // test

  const [openDrawer, setOpenDrawer] = useState(isNew ? true : false);

  const { appointmentId } = useParams();
  console.log(appointmentId);

  const { data: appointment } = useSuspenseQuery({
    queryKey: ["appointment", appointmentId],
    queryFn: async () => {
      const response = await axios.get<AppointmentModel>(
        `/api/appointment/${appointmentId}`
      );
      return response.data;
    },
  });

  const { mutate: deleteAppointment } = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/appointment/${appointmentId}`);
    },
    onSuccess: () => {
      navigate("/");
    },
  });

  return (
    <>
      <Drawer open={openDrawer} onOpenChange={(open) => setOpenDrawer(open)}>
        <Title
          RightComponent={
            <DropdownMenu>
              <DropdownMenuTrigger className="p-2">
                <MoreVerticalIcon size={24} />
              </DropdownMenuTrigger>

              <DropdownMenuContent className="mr-6">
                <DropdownMenuItem
                  onClick={() => {
                    setOpenDrawer(true);
                  }}
                >
                  공유
                </DropdownMenuItem>
                <DropdownMenuItem>편집</DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-500"
                  onClick={() => {
                    deleteAppointment();
                  }}
                >
                  삭제
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          }
        >
          {appointment.title}
        </Title>

        <section className={styles.information}>
          <p className={styles.description}>{appointment.description}</p>

          <div className={styles.field}>
            <Label htmlFor="">장소</Label>
            <Input
              type="text"
              placeholder="장소를 추가하세요"
              readOnly
              onClick={() => {}}
            />
            <div className="flex gap-2">
              {appointment.categoryList.map((keyword, index) => (
                <Badge key={index} variant="secondary">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>

          <div className={styles.field}>
            <Label htmlFor="">마감일</Label>
            <Input
              className="w-full"
              disabled
              type="date"
              value={format(new Date(appointment.deadline), "yyyy-MM-dd")}
            />
          </div>

          <div className={styles.field}>
            <Label htmlFor="">
              인원: {appointment.participantList.length}명
            </Label>

            <div className="flex gap-2">
              {appointment.participantList.map((participant) => (
                <Badge key={participant.id} variant="outline" className="pr-4">
                  <PersonStandingIcon size={16} />
                  {participant.name}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        <DrawerContent>hi</DrawerContent>
      </Drawer>
    </>
  );
}
