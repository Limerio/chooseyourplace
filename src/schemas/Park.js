import { typesOfBuilding } from "@/utils/constants"
import { enumSchema } from "@/utils/functions"
import { Schema } from "mongoose"

export const ParkSchema = new Schema({
	typeOf: enumSchema(String, typesOfBuilding.park),
	public: Boolean,
	freeOrPay: enumSchema(String, ["free", "pay"]),
	price: {
		type: Number,
		// eslint-disable-next-line no-invalid-this
		required: () => this?.freeOrPay === "pay",
	},
})
