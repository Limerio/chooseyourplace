import { typesOfBuilding } from "@/features/places/utils/constants"
import { enumSchema, generateArray } from "@/utils/functions"
import { Schema } from "mongoose"

const stars = generateArray(3)
const averageCost = generateArray(5)

export const RestaurantSchema = new Schema({
	typeOf: enumSchema(String, typesOfBuilding.restaurant),
	stars: enumSchema(Number, stars),
	averageCost: enumSchema(Number, averageCost),
})
