import { useEffect, useState } from "react";
import Title from "../../../components/Title";
import {
  NextButton,
  NextButtonStyle,
} from "../../new-appointment/components/NextButton";
import { MapView } from "../../new-appointment/map";

import styles from "./EditMapView.module.scss";
import { InputTags } from "@/components/ui/input-tags";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { ButtonGroup, ButtonGroupItem } from "@/components/ui/button-group";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useNavermaps } from "react-naver-maps";

const BottomButtonSize = 72;

function useLocationQuery(categoryList: string[]) {
  return useQuery({
    queryKey: ["location", categoryList],
    queryFn: async () => {
      const response = await fetch(
        `/api/location?${categoryList
          .map((category) => `q=${category}`)
          .join("&")}`
      );
      const data = await response.json();
      return data;
    },
    enabled: categoryList.length > 0,
  });
}

export function EditMapView({
  categoryList,
  locationId,
  setCategoryList,
  setLocationId,
  onSubmit,
}: {
  categoryList: string[];
  locationId: string;
  setCategoryList: (categoryList: string[]) => void;
  setLocationId: (locationId: string) => void;
  onSubmit: () => void;
}) {
  const navermaps = useNavermaps();
  const [map, setMap] = useState(null);

  const { data } = useLocationQuery(categoryList);

  const location = data?.find((location) => location.id === locationId);

  useEffect(() => {
    console.log("@@@", location);
    if (!map) return;
    if (!data) return;
    if (!data.length) return;

    let target = location;
    if (!target) {
      target = data[0];
    }

    const latLng = new navermaps.LatLng(
      target.position[1] / 10000000,
      target.position[0] / 10000000
    );

    console.log(latLng);
    console.log(map);
    map.setCenter(latLng);
  }, [data, location, map, navermaps.LatLng]);

  console.log(data);

  const handleChangeCategories = (categoryList: string[]) => {
    setCategoryList(categoryList);
  };

  const handleClickLocation = ($locationId: string) => {
    if (locationId === $locationId) {
      setLocationId("");
    } else {
      setLocationId($locationId);
    }
  };

  return (
    <>
      <Title>약속장소를 추가하세요</Title>

      <div className="h-full relative">
        <MapView navermaps={navermaps} ref={setMap} locations={data} />

        <div className={styles.inputWrapper}>
          <InputTags
            placeholder="카테고리를 입력해주세요."
            value={categoryList}
            onChange={handleChangeCategories}
          />
        </div>

        <div className="w-full absolute" style={{ bottom: BottomButtonSize }}>
          {data && (
            <ButtonGroup value={locationId}>
              <ScrollArea className="w-full whitespace-nowrap rounded-md">
                <div className="flex w-max space-x-4 p-4">
                  {data.map((location) => (
                    <ButtonGroupItem
                      value={location.id}
                      key={location.id}
                      checked={locationId === location.id}
                      className="border bg-background data-[state=checked]:border-slate-950 w-[156px] rounded-md focus:outline-none 2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 shrink-0 overflow-hidden px-2 h-[82px] text-left"
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
        <Button onClick={onSubmit} className={NextButtonStyle}>
          완료
        </Button>
      </NextButton>
    </>
  );
}
