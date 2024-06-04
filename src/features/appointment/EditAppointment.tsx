import { Label } from "@/components/ui/label";
import Title from "../../components/Title";
import styles from "./Appointment.module.scss";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AppointmentModel } from "@/types/AppointmentModel";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function EditAppointment() {
  const navigate = useNavigate();

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

  const [title, setTitle] = useState(appointment.title);
  const [description, setDescription] = useState(appointment.description);

  const { mutate } = useMutation({
    mutationFn: async () => {
      await axios.patch(`/api/appointment/${appointmentId}`, {
        title,
        description,
      });
    },
    onSuccess: () => {
      navigate(`/appointments/${appointmentId}`);
    },
  });

  const [searchParams] = useSearchParams();
  const inputQuery = searchParams.get("input");

  return (
    <>
      <Title
        RightComponent={
          <Button size="sm" onClick={() => mutate()}>
            완료
          </Button>
        }
      >
        내 약속
      </Title>

      <section className={styles.information}>
        <div className={styles.field}>
          <Label htmlFor="title">제목</Label>
          <Input
            id="title"
            autoFocus={inputQuery === "title"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <Label htmlFor="description">설명</Label>
          <Textarea
            id="description"
            autoFocus={inputQuery === "description"}
            placeholder="설명을 추가하세요"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <Label htmlFor="location">장소</Label>
          <Input
            id="location"
            type="text"
            placeholder="장소를 추가하세요"
            onClick={() => {
              navigate(`/appointments/${appointmentId}/edit/location`);
            }}
          />
          <div className="flex gap-2">
            {appointment.categoryList.map((keyword, index) => (
              <Badge key={index} variant="secondary">
                {keyword}
              </Badge>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
