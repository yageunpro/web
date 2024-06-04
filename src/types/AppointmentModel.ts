import { z } from "zod";
import { AppointmentStatus } from "./AppointmentStatus";

// address
// :
// "서울특별시 동작구 상도로 369"
// category
// :
// "대학교>부속건물"
// id
// :
// "018fe3aa-e877-768d-b2b5-f836667d7f60"
// position
// :
// [1269580764, 374972100]
// 0
// :
// 1269580764
// 1
// :
// 374972100
// title
// :
// "<b>숭실대</b>학교조만식기념관"

export const AppointmentModel = z.object({
  id: z.string(),
  organizer_id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  location: z.object({
    id: z.string(),
    title: z.string(),
    address: z.string(),
    position: z.array(z.number()),
  }), // TODO: Define location type
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
