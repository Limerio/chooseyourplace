import {
	artisticMovements,
	freeOrPay,
	typesOfBuilding,
} from "@/features/places/utils/constants"
import { z } from "zod"

export const museumSchema = z.object({
	typeOf: z.enum(typesOfBuilding.museum),
	artisticMovements: z.enum(artisticMovements),
	freeOrPay: z.enum(freeOrPay),
	price: z
		.string()
		.max(1)
		.transform(arg => parseInt(arg, 10))
		.or(z.number().min(1).max(5))
		.nullable(),
})

export const updateMuseumSchema = museumSchema.partial()
