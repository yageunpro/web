import { draftStore, useDraftStore } from "@/components/store/useDraftStore";
import { EditMapView } from "@/features/categoryMap/EditMapView/EditMapView";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function AddCategories() {
  const categoryList = useDraftStore((state) => state.categoryList);
  const locationId = useDraftStore((state) => state.location_id);

  const navigate = useNavigate();

  const aa = useMutation({
    mutationFn: async () => {
      // post appointment
      return axios.post("/api/appointment", draftStore.body());
    },
    onSuccess: ({ data }) => {
      console.log(data);
      useDraftStore.getState().reset();
      navigate(`/appointments/${data.id}?new=true`);
    },
  });

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
      onSubmit={aa.mutate}
    />
  );
}
