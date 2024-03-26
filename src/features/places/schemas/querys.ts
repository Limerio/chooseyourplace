import { z } from "zod"

export const placeQuery = z.object({ placeId: z.string() })
