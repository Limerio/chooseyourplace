import { z } from "zod"

export const verifyQuerySchema = z.object({
	token: z.string(),
})
