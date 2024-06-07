import Title from "@/components/Title";
import { Input } from "@/components/ui/input";
import { useTakerStore } from "./useTakerStore";
import { NextButton } from "../new-appointment/components/NextButton";
import { useNavigate, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function TakerName() {
  const navigate = useNavigate();

  const userName = useTakerStore((state) => state.userName);

  const { appointmentId } = useParams();

  return (
    <>
      <Title>이름을 입력해주세요</Title>
      <div className="p-4">
        <Input
          placeholder="이름"
          value={userName}
          onChange={(e) => {
            useTakerStore.setState({ userName: e.target.value });
          }}
        />
      </div>

      <NextButton>
        <Button
          onClick={() => {
            navigate(
              `/appointments/${appointmentId}/join/annonymous/schedule`,
              {
                replace: true,
              }
            );
          }}
          disabled={!userName}
          size={"lg"}
          className={cn("w-full font-bold")}
        >
          다음
        </Button>
      </NextButton>
    </>
  );
}
