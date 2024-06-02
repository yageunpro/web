import { z } from "zod";
import { AppointmentStatus } from "./AppointmentStatus";

export const AppointmentModel = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  location: z.object({}), // TODO: Define location type
  keywordList: z.array(z.string()),
  participantList: z.array(z.string()),
  status: AppointmentStatus,
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  confirmTime: z.string().datetime(),
});

export type AppointmentModel = z.infer<typeof AppointmentModel>;
