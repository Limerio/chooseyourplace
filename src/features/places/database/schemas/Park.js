import { freeOrPay, typesOfBuilding } from "@/features/places/utils/constants"
import { enumSchema } from "@/utils/functions"
import { Schema } from "mongoose"

export const ParkSchema = new Schema({
	typeOf: enumSchema(String, typesOfBuilding.park),
	public: Boolean,
	freeOrPay: enumSchema(String, freeOrPay),
	price: {
		type: Number,
		// eslint-disable-next-line no-invalid-this
		required: () => this?.freeOrPay === "pay",
	},
})
