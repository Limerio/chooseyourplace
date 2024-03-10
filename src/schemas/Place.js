import { requiredArgSchema } from "@/utils/functions"
/* eslint-disable no-invalid-this */
import { Schema } from "mongoose"
import { BarSchema } from "./Bar.js"
import { MuseumSchema } from "./Museum.js"
import { ParkSchema } from "./Park.js"
import { RestaurantSchema } from "./Restaurant.js"

export const PlaceSchema = new Schema(
	{
		building: {
			type: String,
			enum: ["bar", "museum", "restaurant", "park"],
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
