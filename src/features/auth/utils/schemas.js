import { z } from "zod"

export const checkPassword = z
	.string()
	.regex(
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/u,
		"Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
	)
