import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Title from "../../components/Title";
import { cn } from "@/lib/utils";
import { NextButton } from "../new-appointment/components/NextButton";
import { UserRoundIcon } from "lucide-react";
import { Suspense } from "react";
import { AppointmentList } from "./AppointmentList";

export function Home() {
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

      <Suspense fallback={null}>
        <AppointmentList />
      </Suspense>

      <NextButton>
        <Link
          className={cn(
            buttonVariants({
              size: "lg",
            }),
            "self-stretch font-bold"
          )}
          to="/appointments/new/1"
        >
          새 약속 추가
        </Link>
      </NextButton>
    </>
  );
}
