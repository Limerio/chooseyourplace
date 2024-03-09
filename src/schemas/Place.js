/* eslint-disable no-invalid-this */
import {
	BarSchema,
	MuseumSchema,
	ParkSchema,
	RestaurantSchema,
} from "@/schemas"
import { requiredArgSchema } from "@/utils/functions"
import { Schema } from "mongoose"

export const PlaceSchema = new Schema(
	{
		type: {
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
			required: () => this.type === "museum",
		},
		restaurant: {
			type: RestaurantSchema,
			required: () => this.type === "restaurant",
		},
		park: {
			type: ParkSchema,
			required: () => this.type === "park",
		},
		bar: {
			type: BarSchema,
			required: () => this.type === "bar",
		},
	},
	{
		timestamps: true,
	},
)
