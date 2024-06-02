// endTime
// :
// "2024-06-03T07:28:41.666Z"
// id
// :
// "018fd7a7-25c6-7544-9709-44fb4ca55074"
// startTime
// :
// "2024-06-03T06:28:41.666Z"
// title
// :
// "schedule 2"

import { z } from "zod";

export const Schedule = z.object({
  id: z.string(),
  title: z.string(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
});

export type Schedule = z.infer<typeof Schedule>;
