import { useDraftStore } from "@/components/store/useDraftStore";
import { EditMapView } from "@/features/categoryMap/EditMapView/EditMapView";

export function AddCategories() {
  const categoryList = useDraftStore((state) => state.categoryList);
  const locationId = useDraftStore((state) => state.location_id);

  const handleSubmit = () => {
    alert(JSON.stringify(useDraftStore.getState()));
  };

  return (
    <EditMapView
      categoryList={categoryList}
      locationId={locationId}
      setCategoryList={(categoryList: string[]) =>
        useDraftStore.setState({ categoryList })
      }
      setLocationId={(locationId: string) =>
        useDraftStore.setState({ location_id: locationId })
      }
      onSubmit={handleSubmit}
    />
  );
}
