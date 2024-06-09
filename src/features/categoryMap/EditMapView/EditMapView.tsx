import { useEffect, useState } from "react";
import Title from "../../../components/Title";
import { NextButton } from "../../new-appointment/components/NextButton";
import { MapView } from "../../new-appointment/map";

import styles from "./EditMapView.module.scss";
import { InputTags } from "@/components/ui/input-tags";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useNavermaps } from "react-naver-maps";
import request from "@/api/request";
import { LocationModel } from "@/types/LocationModel";
import { LocationListView } from "./LocationListView";

function useLocationQuery(categoryList: string[]) {
  return useQuery({
    queryKey: ["location", categoryList],
    queryFn: async () => {
      const response = await request.get<LocationModel[]>(
        `/location?${categoryList.map((category) => `q=${category}`).join("&")}`
      );
      return response.data;
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
    // @ts-expect-error navermap 타입은 구리다
    map.setCenter(latLng);
  }, [data, location, map, navermaps.LatLng]);

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

        <LocationListView
          locationList={data}
          selectedLocationId={locationId}
          onClickLocation={handleClickLocation}
        />
      </div>

      <NextButton>
        <Button size="lg" className="self-stretch font-bold" onClick={onSubmit}>
          완료
        </Button>
      </NextButton>
    </>
  );
}
