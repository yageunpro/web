import { z } from "zod";

export const LocationModel = z.object({
  id: z.string(),
  title: z.string(),
  address: z.string(),
  position: z.tuple([z.number(), z.number()]),
});

export type LocationModel = z.infer<typeof LocationModel>;
