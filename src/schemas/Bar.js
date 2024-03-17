import { typesOfBuilding } from "@/utils/constants"
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
	averageCost: z.number().min(1).max(5),
})

export const updateBarSchema = barSchema.partial()
