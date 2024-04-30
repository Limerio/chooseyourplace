import { typesOfBuilding } from "@/features/places/utils/constants"
import { z } from "zod"

export const restaurantSchema = z.object({
	typeOf: z.enum(typesOfBuilding.restaurant),
	stars: z
		.string()
		.max(1)
		.transform(arg => parseInt(arg, 10))
		.or(z.number().min(1).max(3)),
	averageCost: z
		.string()
		.max(1)
		.transform(arg => parseInt(arg, 10))
		.or(z.number().min(1).max(5)),
})

export const updateRestaurantSchema = restaurantSchema.partial()
