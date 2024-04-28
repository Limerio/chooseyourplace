import { freeOrPay, typesOfBuilding } from "@/features/places/utils/constants"
import { z } from "zod"

export const parkSchema = z.object({
	typeOf: z.enum(typesOfBuilding.park),
	public: z.boolean(),
	freeOrPay: z.enum(freeOrPay),
	price: z
		.string()
		.max(1)
		.transform(arg => parseInt(arg, 10))
		.or(z.number().min(1).max(5))
		.nullable(),
})

export const updateParkSchema = parkSchema.partial()
