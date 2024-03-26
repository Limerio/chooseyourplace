import { PlaceSchema } from "@/features/places/schemas"
import mongoose from "mongoose"

export const PlaceModel =
	mongoose.models.Place || mongoose.model("Place", PlaceSchema, "places")
