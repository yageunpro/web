import { z } from "zod";

export const AppointmentStatus = z.enum([
  "DRAFT",
  "CONFIRM",
  "DONE",
  "CANCEL",
  "DELETE",
]);

export type AppointmentStatus = z.infer<typeof AppointmentStatus>;
