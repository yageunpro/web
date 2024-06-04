import React from "react";
import { Container as MapDiv, NaverMap, Marker } from "react-naver-maps";

function BaseMapView(
  { navermaps, locations }: { navermaps: any; locations: any },
  ref: any
) {
  return (
    <MapDiv className="w-full h-full relative">
      {" "}
      <NaverMap
        ref={ref}
        defaultCenter={new navermaps.LatLng(37.4945203, 126.9598448)}
        defaultZoom={15}
      >
        {/* <Marker
          defaultPosition={new navermaps.LatLng(37.4945203, 126.9598448)}
        /> */}
        {locations &&
          locations.map((location: any) => (
            <Marker
              key={location.id}
              position={
                new navermaps.LatLng(
                  location.position[1] / 10000000,
                  location.position[0] / 10000000
                )
              }
            />
          ))}
      </NaverMap>
    </MapDiv>
  );
}

export const MapView = React.forwardRef(BaseMapView);
