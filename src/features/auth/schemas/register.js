import { checkPassword } from "@/features/auth/utils/schemas"
import { matchs } from "@/utils/errors"
import { z } from "zod"

export const registerSchema = z
	.object({
		username: z.string(),
		email: z.string().email(),
		password: checkPassword,
		confirmPassword: checkPassword,
	})
	.refine(data => data.password === data.confirmPassword, {
		message: matchs.passwords,
		path: ["confirmPassword"],
	})
