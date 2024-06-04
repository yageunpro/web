import { z } from "zod";
import { AppointmentStatus } from "./AppointmentStatus";

export const AppointmentModel = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional().nullable(),
  location: z.object({}), // TODO: Define location type
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
