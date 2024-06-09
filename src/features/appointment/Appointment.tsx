import { Label } from "@/components/ui/label";
import Title from "../../components/Title";
import styles from "./Appointment.module.scss";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CopyIcon, MoreVerticalIcon, PersonStandingIcon } from "lucide-react";
import { AppointmentModel } from "@/types/AppointmentModel";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn, prettyDate, stripHtml } from "@/lib/utils";
import request from "@/api/request";
import CopyToClipboard from "react-copy-to-clipboard";
import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from "sonner";
import { Recommendation } from "./Recommendation";
import { NextButton } from "../new-appointment/components/NextButton";
import axios from "axios";

export function Appointment() {
  const navigate = useNavigate();

  const { data: me, isSuccess: loggedIn } = useQuery({
    queryKey: ["user", "me"],
    queryFn: async () => {
      const response = await axios.get("/api/user/me");
      return response.data;
    },
  });

  const { appointmentId } = useParams();
  console.log(appointmentId);

  const { data: appointment, refetch } = useSuspenseQuery({
    queryKey: ["appointment", appointmentId],
    queryFn: async () => {
      const response = await request.get<AppointmentModel>(
        `/appointment/${appointmentId}`
      );
      return response.data;
    },
  });

  const isMine = me?.id === appointment.organizer_id;
  const canEdit = isMine && appointment.status === "DRAFT";

  const [searchParams] = useSearchParams();
  const isNew = searchParams.get("new"); // test

  if (isNew) {
    navigate(".", {
      replace: true,
    });
  }

  const [openDrawer, setOpenDrawer] = useState(isNew ? true : false);

  const { mutate: deleteAppointment } = useMutation({
    mutationFn: async () => {
      await request.delete(`/appointment/${appointmentId}`);
    },
    onSuccess: () => {
      navigate("/", {
        replace: true,
      });
    },
  });

  const edit = (id?: string) => () => {
    if (!canEdit) {
      return;
    }

    if (id) {
      navigate(`./edit?input=${id}`, {
        replace: true,
      });
      return;
    }

    navigate(`./edit`, {
      replace: true,
    });
  };

  const { mutate: join } = useMutation({
    mutationFn: async () => {
      return request.post(`/appointment/${appointmentId}/join`);
    },
  });

  const url = `${window.location.origin}/appointments/${appointmentId}`;

  return (
    <>
      <Drawer open={openDrawer} onOpenChange={(open) => setOpenDrawer(open)}>
        <Title
          RightComponent={
            isMine && (
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
                  {canEdit && (
                    <DropdownMenuItem onClick={edit()}>편집</DropdownMenuItem>
                  )}
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
            )
          }
        >
          내 약속
        </Title>

        <section className={styles.information}>
          <div className={styles.field}>
            <Label htmlFor="title">제목</Label>
            <Input
              id="title"
              value={appointment.title}
              readOnly
              onClick={edit("title")}
            />
          </div>

          <div className={styles.field}>
            <Label htmlFor="description">설명</Label>
            <Textarea
              id="description"
              onClick={edit("description")}
              readOnly
              placeholder="설명을 추가하세요"
              value={appointment.description}
            />
          </div>

          <div className={styles.field}>
            <Label htmlFor="location">장소</Label>
            <Input
              id="location"
              type="text"
              placeholder="장소를 추가하세요"
              readOnly
              value={stripHtml(appointment.location?.title ?? "")}
              onClick={() => {
                if (!canEdit) {
                  return;
                }
                navigate(`/appointments/${appointmentId}/edit/location`, {
                  replace: true,
                });
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

          {appointment.status === "DRAFT" && (
            <div className={styles.field}>
              <Label htmlFor="">마감일</Label>
              <Input
                className="w-full"
                readOnly
                value={prettyDate(new Date(appointment.deadline))}
              />
            </div>
          )}

          {appointment.status === "CONFIRM" && appointment.confirmTime && (
            <div className={styles.field}>
              <Label htmlFor="">시간</Label>
              <Input
                className="w-full"
                readOnly
                value={prettyDate(new Date(appointment.confirmTime))}
              />
            </div>
          )}

          <div className={styles.field}>
            <Label htmlFor="">
              인원: {appointment.participantList.length}명
            </Label>

            <div className="flex gap-2 flex-wrap">
              {appointment.participantList.map((participant) => (
                <Badge key={participant.id} variant="outline" className="pr-4">
                  <PersonStandingIcon size={16} />
                  {participant.name}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        <DrawerContent className="px-3 pb-24 gap-4">
          {" "}
          <DrawerHeader>
            <DrawerTitle>약속 생성 완료!</DrawerTitle>
          </DrawerHeader>
          <CopyToClipboard
            text={url}
            onCopy={() => {
              toast("클립보드에 복사됨", {
                duration: 2000,
                position: "top-center",
              });
            }}
          >
            <Button
              className="relative w-full overflow-hidden text-ellipsis justify-normal"
              variant="secondary"
            >
              {url}

              <div className="absolute right-0 flex items-center justify-center px-3 bg-secondary ">
                <CopyIcon size={20} />
              </div>
            </Button>
          </CopyToClipboard>
          {/* <Button>카카오톡으로 공유하기</Button> */}
        </DrawerContent>
      </Drawer>

      {isMine && appointment.status === "DRAFT" && (
        <Recommendation
          appointmentId={appointmentId}
          onConfirm={() => {
            refetch();
          }}
        />
      )}

      {!isMine && appointment.status === "DRAFT" && (
        <NextButton>
          <Button
            className={cn(
              buttonVariants({
                size: "lg",
              }),
              "self-stretch font-bold"
            )}
            onClick={() => {
              if (loggedIn) {
                join();
                refetch();
              } else {
                navigate("./join");
              }
            }}
          >
            약속 참여하기
          </Button>
        </NextButton>
      )}

      {appointment.status === "CONFIRM" && (
        <NextButton>
          <div className="self-stretch bg-green-500 h-12 rounded-md px-8 font-bold flex items-center justify-center text-white">
            확정된 약속입니다.
          </div>
        </NextButton>
      )}
    </>
  );
}
