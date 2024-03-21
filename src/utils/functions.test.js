import { expect, expectTypeOf, it } from "vitest"
import {
	addSpaceBetweenCapitalizeLetter,
	capitalize,
	enumSchema,
	formatTitle,
	generateArray,
	requiredArgSchema,
} from "./functions"

it("Required String schema", () => {
	const requiredStringSchema = requiredArgSchema(String)

	expectTypeOf(requiredStringSchema).toBeObject()
	expect(requiredStringSchema.required).toBeTruthy()
	expect(requiredStringSchema.type).toBe(String)
})

it("Enum Schema", () => {
	const firstValue = Math.random()
	const enumSchemaNumber = enumSchema(Number, [
		firstValue,
		Math.random(),
		Math.random(),
	])

	expectTypeOf(enumSchemaNumber).toBeObject()
	expect(enumSchemaNumber.type).toBe(Number)
	expect(enumSchemaNumber.enum[0]).toBe(firstValue)
})

it("Generate array", () => {
	const generatedArray = generateArray(5)

	expectTypeOf(generatedArray).toBeArray()
	expect(generatedArray.length).toBe(5)
	expect(generatedArray[0]).toBe(1)
})

it("Capitalize", () => {
	const capitalizeText = capitalize("capitalize")

	expectTypeOf(capitalizeText).toBeString()
	expect(capitalizeText).toBe("Capitalize")
})

it("Add space between capitalize letter", () => {
	const spaceBetweenCapitalize = addSpaceBetweenCapitalizeLetter(
		"spaceBetweenCapitalize",
	)

	expectTypeOf(spaceBetweenCapitalize).toBeString()
	expect(spaceBetweenCapitalize).toBe("space Between Capitalize")
})

it("format title", () => {
	const formatedTitle = formatTitle("List of places - chooseyourplace")

	expectTypeOf(formatedTitle).toBeString()
	expect(formatedTitle).toBe("List of places")
})
