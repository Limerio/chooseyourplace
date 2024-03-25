import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 *
 * @param  {...string} inputs
 * @returns {string}
 */

export const cn = (...inputs) => twMerge(clsx(inputs))

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

/**
 *
 * @param {string} path
 * @param {RequestInit} options
 * @returns
 */

export const requestAPI = async (server, path, options) => {
	if (server) {
		return (await fetch(`http://localhost:3000/api${path}`, options)).json()
	}

	return (await fetch(`/api${path}`, options)).json()
}

/**
 *
 * @param {string} text
 * @returns {string}
 */

export const capitalize = text => text.charAt(0).toUpperCase() + text.slice(1)

/**
 *
 * @param {string} text
 * @returns {string}
 */
export const addSpaceBetweenCapitalizeLetter = text =>
	text.replace(/([a-z])([A-Z])/gu, "$1 $2")

/**
 *
 * @param {object} object
 * @param {string[]} keys
 * @returns
 */
export const pick = (object, keys) =>
	keys.reduce((obj, key) => {
		if (object && Object.hasOwn(object, key)) {
			obj[key] = object[key]
		}

		return obj
	}, {})

export const formatTitle = title => title.split("-")[0].trim()
