import { UserSchema } from "@/features/users/database/schemas"
import mongoose from "mongoose"

export const UserModel =
	mongoose.models.User || mongoose.model("User", UserSchema, "users")
