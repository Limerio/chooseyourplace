import { clsx } from "clsx"
import mongoose from "mongoose"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
	return twMerge(clsx(inputs))
}

export const handlerApi = handle => async (req, res) => {
	await mongoose.connect(process.env.DATABASE_URL)

	return handle(req, res)
}

export const requiredArgSchema = type => ({
	required: true,
	type,
})
