import {
	updateBarSchema,
	updateMuseumSchema,
	updateParkSchema,
	updateRestaurantSchema,
} from "@/features/places/schemas"
import { listOfBuildings } from "@/features/places/utils/constants"
import { z } from "zod"

const baseSchema = {
	building: z.enum(listOfBuildings),
	city: z.string().min(3),
	zipcode: z
		.string()
		.min(4)
		.transform(arg => parseInt(arg, 10))
		.or(z.number()),
	country: z.string().min(3),
}

export const placeSchema = z.object({
	building: baseSchema.building,
	name: z.string().min(3),
	city: baseSchema.city,
	zipcode: baseSchema.zipcode,
	country: baseSchema.country,
})

export const updatePlaceSchema = placeSchema.partial()

export const updateSubSchemas = {
	bar: updateBarSchema,
	museum: updateMuseumSchema,
	park: updateParkSchema,
	restaurant: updateRestaurantSchema,
}

export const filterQueryPlace = z
	.object({
		building: baseSchema.building,
		city: baseSchema.city,
		zipcode: baseSchema.zipcode,
		country: baseSchema.country,
	})
	.partial()
