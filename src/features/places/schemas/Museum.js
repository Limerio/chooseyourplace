import {
	artisticMovements,
	freeOrPay,
	typesOfBuilding,
} from "@/features/places/utils/constants"
import { enumSchema } from "@/utils/functions"
import { Schema } from "mongoose"
import { z } from "zod"

export const MuseumSchema = new Schema({
	artisticMovement: enumSchema(String, artisticMovements),
	typeOf: enumSchema(String, typesOfBuilding.museum),
	freeOrPay: enumSchema(String, freeOrPay),
	price: {
		type: Number,
		// eslint-disable-next-line no-invalid-this
		required: () => this?.freeOrPay === "pay",
	},
})

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
