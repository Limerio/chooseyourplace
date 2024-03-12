import { typesOfBuilding } from "@/utils/constants"
import { enumSchema, generateArray } from "@/utils/functions"
import { Schema } from "mongoose"
import { z } from "zod"

const stars = generateArray(3)
const averageCost = generateArray(5)

export const RestaurantSchema = new Schema({
	typeOf: enumSchema(String, typesOfBuilding.restaurant),
	stars: enumSchema(Number, stars),
	averageCost: enumSchema(Number, averageCost),
})

export const restaurantSchema = z.object({
	typeOf: z.enum(typesOfBuilding.restaurant),
	stars: z.enum(stars),
	averageCost: z.enum(averageCost),
})
