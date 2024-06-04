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
import { ButtonGroup, ButtonGroupItem } from "@/components/ui/button-group";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const BottomButtonSize = 72;

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
  const [selectedLocation, setSelectedLocation] = useState<string | undefined>(
    undefined
  );

  const { data } = useLocationQuery(categories);

  const location = data?.find((location) => location.id === selectedLocation);

  const handleClickLocation = (locationId: string) => {
    if (selectedLocation === locationId) {
      setSelectedLocation(undefined);
    } else {
      setSelectedLocation(locationId);
    }
  };

  console.log(location);

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

        <div className="w-full absolute" style={{ bottom: BottomButtonSize }}>
          {data && (
            <ButtonGroup value={selectedLocation}>
              <ScrollArea className="w-full whitespace-nowrap rounded-md">
                <div className="flex w-max space-x-4 p-4">
                  {data.map((location) => (
                    <ButtonGroupItem
                      value={location.id}
                      key={location.id}
                      checked={selectedLocation === location.id}
                      className="border bg-background data-[state=checked]:outline-slate-950 data-[state=checked]:outline-2 text-center h-full w-[156px] rounded-md focus:outline-none 2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 shrink-0 overflow-hidden px-2 h-[82px] text-left"
                      onClick={() => handleClickLocation(location.id)}
                    >
                      <div className="flex flex-col gap-[2px] w-full overflow-hidden ">
                        <div
                          dangerouslySetInnerHTML={{ __html: location.title }}
                          className="w-full overflow-hidden text-sm text-ellipsis"
                        />
                        <p className="w-full whitespace-normal break-before-auto text-xs">
                          {location.address}
                        </p>
                      </div>
                    </ButtonGroupItem>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </ButtonGroup>
          )}
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
