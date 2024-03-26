import type { Constructors, ReadonlyStringArray } from "@/utils/types"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: string[]): string => twMerge(clsx(inputs))

type RequiredArgSchemaType = {
	required: true
	type: Constructors
}

export const requiredArgSchema = (
	type: Constructors,
): RequiredArgSchemaType => ({
	required: true,
	type,
})

type EnumSchemaType = {
	type: Constructors
	enum: ReadonlyStringArray
}

export const enumSchema = (
	type: Constructors,
	enums: ReadonlyStringArray,
): EnumSchemaType => ({
	enum: enums,
	type,
})

export const generateArray = (number: number): number[] => {
	const data = []

	for (let i = 0; i < number; i += 1) {
		data.push(i + 1)
	}

	return data
}

export const requestAPI = async (
	server: boolean,
	path: string,
	options: RequestInit,
) => {
	if (server) {
		return (await fetch(`http://localhost:3000/api${path}`, options)).json()
	}

	return (await fetch(`/api${path}`, options)).json()
}

export const capitalize = (text: string): string =>
	text.charAt(0).toUpperCase() + text.slice(1)

export const addSpaceBetweenCapitalizeLetter = (text: string): string =>
	text.replace(/([a-z])([A-Z])/gu, "$1 $2")

export const pick = (
	object: Record<string, string>,
	keys: string[],
): Record<string, string> =>
	keys.reduce((obj: Record<string, string>, key) => {
		if (object && Object.hasOwn(object, key)) {
			obj[key] = object[key]
		}

		return obj
	}, {})

export const formatTitle = (title: string): string => title.split("-")[0].trim()
