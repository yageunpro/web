import { Suspense, useState } from "react";
import Title from "../../../components/Title";
import {
  NextButton,
  NextButtonStyle,
} from "../../new-appointment/components/NextButton";
import { MapView } from "../../new-appointment/map";

import styles from "./AddCategories.module.scss";
import { InputTags } from "@/components/ui/input-tags";
import { Button } from "@/components/ui/button";
import { useDraftStore } from "@/components/store/useDraftStore";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroupItemModern } from "@/components/ui/radio-group-modern";
import { ButtonGroup, ButtonGroupItem } from "@/components/ui/button-group";

const BottomButtonSize = 86;

function useLocationQuery(categories: string[]) {
  return useQuery({
    queryKey: ["location", categories],
    queryFn: async () => {
      const response = await fetch(
        `/api/location?${categories
          .map((category) => `q=${category}`)
          .join("&")}`
      );
      const data = await response.json();
      return data;
    },
    enabled: categories.length > 0,
  });
}

export function AddCategories() {
  const handleClick = () => {
    alert(JSON.stringify(useDraftStore.getState()));
  };

  const [categories, setCategories] = useState<string[]>(["숭실대", "햄버거"]);

  const { data } = useLocationQuery(categories);

  console.log(data);

  const handleChangeCategories = (categories: string[]) => {
    setCategories(categories);
  };

  return (
    <>
      <Title>약속장소를 추가하세요</Title>

      <div className="h-full relative">
        <Suspense fallback={null}>
          <MapView />
        </Suspense>

        <div className={styles.inputWrapper}>
          <InputTags
            placeholder="카테고리를 입력해주세요."
            value={categories}
            onChange={handleChangeCategories}
          />
        </div>

        {/* <ul
          className={`absolute w-full flex p-4 gap-2`}
          style={{ bottom: BottomButtonSize }}
        >
          {categories.map((category, index) => (
            <Card key={index} className=" p-2">
              {category}
            </Card>
          ))}
        </ul> */}

        <div className="w-full absolute" style={{ bottom: BottomButtonSize }}>
          <ButtonGroup>
            {data &&
              data.map((location) => (
                <ButtonGroupItem
                  key={location.id}
                  className="border border-gray-300 rounded-md"
                >
                  {location.title}
                </ButtonGroupItem>
              ))}
          </ButtonGroup>
          {/* {data && data.length > 0 && (
            <RadioGroup className="overflow-x-auto">
              {data.map((location) => (
                <RadioGroupItemModern key={location.id} value={location.id}>
                  {location.title}
                </RadioGroupItemModern>
              ))}
            </RadioGroup>
          )} */}
        </div>
      </div>

      <NextButton>
        <Button onClick={handleClick} className={NextButtonStyle}>
          완료
        </Button>
      </NextButton>
    </>
  );
}
