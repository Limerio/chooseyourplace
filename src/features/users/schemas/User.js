import { requiredArgSchema } from "@/utils/functions"
import { Schema } from "mongoose"

export const UserSchema = new Schema(
	{
		username: requiredArgSchema(String),
		email: requiredArgSchema(String),
		password: requiredArgSchema(String),
		verified: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true },
)
