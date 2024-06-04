import { Label } from "@/components/ui/label";
import Title from "../../../../components/Title";
import { NextButton, NextButtonStyle } from "../../components/NextButton";
import styles from "./WhatEvent.module.scss";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useDraftStore } from "@/components/store/useDraftStore";
import { useNavigate } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";

function useMeQuery() {
  return useSuspenseQuery({
    queryKey: ["user", "me"],
    queryFn: async () => {
      const response = await fetch("/api/user/me");
      const data = await response.json();
      return data;
    },
  });
}

export function WhatEvent() {
  const { data } = useMeQuery();

  const [title, setTitle] = useState(`${data.username}의 모임`);
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  console.log(data);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title) return;

    useDraftStore.setState({ title, description });

    navigate("/appointments/new/4");
  };

  return (
    <>
      <Title>어떤 약속인가요?</Title>

      <form className={styles.formWrapper} onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          <Label htmlFor="formTitle">제목</Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="formTitle"
            type="text"
            placeholder="약속 제목을 정해주세요"
          />
        </div>

        <div className={styles.inputWrapper}>
          <Label htmlFor="formDescription">설명</Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="formDescription"
            cols={30}
            rows={6}
            placeholder="설명을 추가해주세요"
          />
        </div>

        <NextButton>
          <Button disabled={!title} type="submit" className={NextButtonStyle}>
            다음
          </Button>
        </NextButton>
      </form>
    </>
  );
}
