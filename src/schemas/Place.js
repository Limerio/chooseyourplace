import { requiredArgSchema } from "@/utils/functions"
/* eslint-disable no-invalid-this */
import { listOfBuildings } from "@/utils/constants.js"
import { Schema } from "mongoose"
import { z } from "zod"
import { BarSchema, updateBarSchema } from "./Bar.js"
import { MuseumSchema, updateMuseumSchema } from "./Museum.js"
import { ParkSchema, updateParkSchema } from "./Park.js"
import { RestaurantSchema, updateRestaurantSchema } from "./Restaurant.js"

export const PlaceSchema = new Schema(
	{
		building: {
			type: String,
			enum: listOfBuildings,
		},
		name: {
			...requiredArgSchema(String),
			unique: true,
			index: true,
		},
		city: requiredArgSchema(String),
		zipcode: requiredArgSchema(Number),
		country: requiredArgSchema(String),
		museum: {
			type: MuseumSchema,
			required: () => this?.building === "museum",
		},
		park: {
			type: ParkSchema,
			required: () => this?.building === "park",
		},
		bar: {
			type: BarSchema,
			required: () => this?.building === "bar",
		},
		restaurant: {
			type: RestaurantSchema,
			required: () => this?.building === "restaurant",
		},
	},
	{
		timestamps: true,
	},
)
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
