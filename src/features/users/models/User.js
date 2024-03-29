import { UserSchema } from "@/features/places/schemas"
import mongoose from "mongoose"

export const PlaceModel =
	mongoose.models.Place || mongoose.model("User", UserSchema, "Users")
