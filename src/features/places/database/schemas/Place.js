import { BarSchema } from "@/features/places/database/schemas/Bar"
import { MuseumSchema } from "@/features/places/database/schemas/Museum"
import { ParkSchema } from "@/features/places/database/schemas/Park"
import { RestaurantSchema } from "@/features/places/database/schemas/Restaurant"
import { listOfBuildings } from "@/features/places/utils/constants"
import { requiredArgSchema } from "@/utils/functions"
/* eslint-disable no-invalid-this */
import { Schema } from "mongoose"

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
