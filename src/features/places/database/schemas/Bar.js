import { typesOfBuilding } from "@/features/places/utils/constants"
import { enumSchema, generateArray } from "@/utils/functions"
import { Schema } from "mongoose"

const averageCost = generateArray(5)

export const BarSchema = new Schema({
	typeOf: enumSchema(String, typesOfBuilding.bar),
	averageCost: enumSchema(Number, averageCost),
})
