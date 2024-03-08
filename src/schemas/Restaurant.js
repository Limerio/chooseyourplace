import { typesOfBuilding } from "@/utils/constants"
import { enumSchema, generateArray } from "@/utils/functions"
import { Schema } from "mongoose"

export const RestaurantSchema = new Schema({
	type: enumSchema(String, typesOfBuilding.restaurant),
	stars: enumSchema(Number, generateArray(3)),
	averageCost: enumSchema(Number, generateArray(5)),
})
