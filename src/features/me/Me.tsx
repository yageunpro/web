import Title from "@/components/Title";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useMeQuery } from "@/hooks/useMeQuery";
import { Label } from "@radix-ui/react-label";

import GoogleIcon from "@/assets/google.svg";

export function Me() {
  const { data: me } = useMeQuery();

  return (
    <>
      <Title>내 프로필</Title>

      <div className="flex flex-col">
        <div className="flex justify-between items-center p-4">
          <Label className="font-bold">이름</Label>
          <p>{me.username}</p>
        </div>

        <Separator className="ml-3" />

        <div className="flex justify-between items-center p-4">
          <Label className="font-bold">이메일</Label>
          <p>{me.email}</p>
        </div>

        <Separator className="ml-3" />

        <div className="flex justify-between items-center p-4">
          <Label className="font-bold">연동된 캘린더 계정</Label>
        </div>

        <div className="flex flex-col px-3">
          <Card className="p-3 flex gap-3">
            <img src={GoogleIcon} alt="Google" />
            {me.email}
          </Card>
        </div>
      </div>
    </>
  );
}
