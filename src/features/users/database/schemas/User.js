import { requiredArgSchema } from "@/utils/functions"
import { Schema } from "mongoose"

export const UserSchema = new Schema(
	{
		username: requiredArgSchema(String),
		email: requiredArgSchema(String),
		password: requiredArgSchema(String),
		verified: {
			state: {
				type: Boolean,
				default: false,
			},
			token: {
				type: String,
				// eslint-disable-next-line no-invalid-this
				required: () => this?.verified.state === false,
			},
		},
	},
	{ timestamps: true },
)
