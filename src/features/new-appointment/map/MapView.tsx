import {
  Container as MapDiv,
  NaverMap,
  Marker,
  useNavermaps,
} from "react-naver-maps";

export function MapView() {
  const navermaps = useNavermaps();

  return (
    <MapDiv className="w-full h-full relative">
      {" "}
      <NaverMap
        defaultCenter={new navermaps.LatLng(37.3595704, 127.105399)}
        defaultZoom={15}
      >
        <Marker
          defaultPosition={new navermaps.LatLng(37.3595704, 127.105399)}
        />
      </NaverMap>
    </MapDiv>
  );
}
