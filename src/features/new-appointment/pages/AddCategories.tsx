import Title from "../../../components/Title";
import { NextButton, NextButtonStyle } from "../components/NextButton";
import {
  Container as MapDiv,
  NaverMap,
  Marker,
  useNavermaps,
} from "react-naver-maps";

export function AddCategories() {
  const navermaps = useNavermaps();

  const handleClick = () => {
    alert("생성 API 내놔~!");
  };

  return (
    <>
      <Title>카테고리를 추가하세요</Title>
      <MapDiv
        style={{
          width: "100%",
          height: "400px",
        }}
      >
        <NaverMap
          defaultCenter={new navermaps.LatLng(37.3595704, 127.105399)}
          defaultZoom={15}
        >
          <Marker
            defaultPosition={new navermaps.LatLng(37.3595704, 127.105399)}
          />
        </NaverMap>
      </MapDiv>
      <NextButton>
        <button onClick={handleClick} className={NextButtonStyle}>
          완료
        </button>
      </NextButton>
    </>
  );
}
