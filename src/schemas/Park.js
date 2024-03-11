import { freeOrPay, typesOfBuilding } from "@/utils/constants"
import { enumSchema } from "@/utils/functions"
import { Schema } from "mongoose"
import { z } from "zod"

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

export const parkSchema = z.object({
	typeOf: z.enum(typesOfBuilding.museum),
	public: z.boolean(),
	freeOrPay: z.enum(freeOrPay),
	price: z.number().nullable(),
})
