import { clsx } from "clsx"
import mongoose from "mongoose"
import { twMerge } from "tailwind-merge"

/**
 *
 * @param  {...string} inputs
 * @returns {string}
 */

export const cn = (...inputs) => twMerge(clsx(inputs))

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

/**
 *
 * @param {number} number
 * @returns {number[]}
 */

export const generateArray = number => {
	const data = []

	for (let i = 0; i < number; i += 1) {
		data.push(i + 1)
	}

	return data
}
