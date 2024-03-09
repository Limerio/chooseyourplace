import { typesOfBuilding } from "@/utils/constants"
import { enumSchema, generateArray } from "@/utils/functions"
import { Schema } from "mongoose"

export const BarSchema = new Schema({
	type: enumSchema(String, typesOfBuilding.bar),
	averageCost: enumSchema(Number, generateArray(5)),
})
