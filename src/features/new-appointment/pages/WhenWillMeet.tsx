import Title from "../../../components/Title";
import { CardButton } from "../components/CardButton";

export function WhenWillMeet() {
  return (
    <>
      <Title>언제 만날까요?</Title>
      <CardButton to="#2">1주일 안에</CardButton>
      <CardButton to="#2">2주일 안에</CardButton>
      <CardButton to="#2">한 달 안에</CardButton>
    </>
  );
}
