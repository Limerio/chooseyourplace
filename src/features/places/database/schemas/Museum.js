import {
	artisticMovements,
	freeOrPay,
	typesOfBuilding,
} from "@/features/places/utils/constants"
import { enumSchema } from "@/utils/functions"
import { Schema } from "mongoose"

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
