import { checkPassword } from "@/features/auth/utils/schemas"
import { z } from "zod"

export const loginSchema = z.object({
	email: z.string().email(),
	password: checkPassword,
})
