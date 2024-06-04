import { EditMapView } from "@/features/categoryMap/EditMapView/EditMapView";
import { AppointmentModel } from "@/types/AppointmentModel";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function EditCategories() {
  const { appointmentId } = useParams();

  const { data: appointment, refetch } = useSuspenseQuery({
    queryKey: ["appointment", appointmentId],
    queryFn: async () => {
      const response = await axios.get<AppointmentModel>(
        `/api/appointment/${appointmentId}`
      );
      return response.data;
    },
  });

  const [categoryList, setCategoryList] = useState<string[]>(
    appointment.categoryList
  );
  const [locationId, setLocationId] = useState<string>(
    appointment.location?.id
  );

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: async () => {
      await axios.patch(`/api/appointment/${appointmentId}`, {
        categoryList,
        location_id: locationId,
      });
    },
    onSuccess: () => {
      refetch();
      navigate(`/appointments/${appointmentId}`);
    },
  });

  return (
    <EditMapView
      categoryList={categoryList}
      locationId={locationId}
      setCategoryList={setCategoryList}
      setLocationId={setLocationId}
      onSubmit={mutate}
    />
  );
}
