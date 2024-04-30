import { typesOfBuilding } from "@/features/places/utils/constants"
import { z } from "zod"

export const barSchema = z.object({
	typeOf: z.enum(typesOfBuilding.bar),
	averageCost: z
		.string()
		.max(1)
		.transform(arg => parseInt(arg, 10))
		.or(z.number().min(1).max(5)),
})

export const updateBarSchema = barSchema.partial()
