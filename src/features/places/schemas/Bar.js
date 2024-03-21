import { typesOfBuilding } from "@/features/places/utils/constants"
import { enumSchema, generateArray } from "@/utils/functions"
import { Schema } from "mongoose"
import { z } from "zod"

const averageCost = generateArray(5)

export const BarSchema = new Schema({
	typeOf: enumSchema(String, typesOfBuilding.bar),
	averageCost: enumSchema(Number, averageCost),
})

export const barSchema = z.object({
	typeOf: z.enum(typesOfBuilding.bar),
	averageCost: z
		.string()
		.max(1)
		.transform(arg => parseInt(arg, 10))
		.or(z.number().min(1).max(5)),
})

export const updateBarSchema = barSchema.partial()
