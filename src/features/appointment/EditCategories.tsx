import { EditMapView } from "@/features/categoryMap/EditMapView/EditMapView";
import { useState } from "react";

export function EditCategories() {
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [locationId, setLocationId] = useState<string>("");

  const handleSubmit = () => {
    alert(JSON.stringify({ categoryList, locationId }));
  };

  return (
    <EditMapView
      categoryList={categoryList}
      locationId={locationId}
      setCategoryList={setCategoryList}
      setLocationId={setLocationId}
      onSubmit={handleSubmit}
    />
  );
}
