import { clsx } from "clsx"
import mongoose from "mongoose"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
	return twMerge(clsx(inputs))
}

/**
 *
 * @param {Function} handle
 * @returns {Function}
 */

export const handlerApi = handle => async (req, res) => {
	await mongoose.connect(process.env.DATABASE_URL)

	return handle(req, res)
}

/**
 *
 * @param {StringConstructor | NumberConstructor | BooleanConstructor} type
 * @returns
 */
export const requiredArgSchema = type => ({
	required: true,
	type,
})

/**
 *
 * @param {StringConstructor | NumberConstructor} type
 * @param {(string | number)[]} enums
 * @returns
 */

export const enumSchema = (type, enums) => ({
	enum: enums,
	type,
})

export const generateArray = number => {
	const data = []

	for (let i = 0; i < number; i += 1) {
		data.push(i + 1)
	}

	return data
}
