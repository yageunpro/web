import { z } from "zod";
import { AppointmentStatus } from "./AppointmentStatus";
import { LocationModel } from "./LocationModel";

export const AppointmentModel = z.object({
  id: z.string(),
  organizer_id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  location: LocationModel.nullable(),
  categoryList: z.array(z.string()),
  participantList: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    })
  ),
  status: AppointmentStatus,
  startTime: z.string().datetime().optional().nullable(),
  deadline: z.string().datetime(),
  confirmTime: z.string().datetime().optional().nullable(),
});

export type AppointmentModel = z.infer<typeof AppointmentModel>;
