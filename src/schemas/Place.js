import { requiredArgSchema } from "@/utils/functions"
import { Schema } from "mongoose"

export const PlaceSchema = new Schema(
	{
		type: {
			type: String,
			enum: ["bar", " museum_pay", "museum_free", "restaurant", "monument"],
		},
		name: {
			...requiredArgSchema(String),
			unique: true,
			index: true,
		},
		city: requiredArgSchema(String),
		zipcode: requiredArgSchema(Number),
		country: requiredArgSchema(String),
	},
	{
		timestamps: true,
	},
)
