import { expect, expectTypeOf, test } from "vitest"
import {
	addSpaceBetweenCapitalizeLetter,
	capitalize,
	enumSchema,
	generateArray,
	requiredArgSchema,
} from "./functions"

test("Required String schema", async () => {
	const requiredStringSchema = requiredArgSchema(String)

	await expectTypeOf(requiredStringSchema).toBeObject()
	await expect(requiredStringSchema.required).toBeTruthy()
	await expect(requiredStringSchema.type).toBe(String)
})

test("Enum Schema", async () => {
	const firstValue = Math.random()
	const enumSchemaNumber = enumSchema(Number, [
		firstValue,
		Math.random(),
		Math.random(),
	])

	await expectTypeOf(enumSchemaNumber).toBeObject()
	await expect(enumSchemaNumber.type).toBe(Number)
	await expect(enumSchemaNumber.enum[0]).toBe(firstValue)
})

test("Generate array", async () => {
	const generatedArray = generateArray(5)

	await expectTypeOf(generatedArray).toBeArray()
	await expect(generatedArray.length).toBe(5)
	await expect(generatedArray[0]).toBe(1)
})

test("Capitalize", async () => {
	const capitalizeText = capitalize("capitalize")

	expectTypeOf(capitalizeText).toBeString()
	await expect(capitalizeText).toBe("Capitalize")
})

test("Add space between capitalize letter", async () => {
	const spaceBetweenCapitalize = addSpaceBetweenCapitalizeLetter(
		"spaceBetweenCapitalize",
	)

	expectTypeOf(spaceBetweenCapitalize).toBeString()
	await expect(spaceBetweenCapitalize).toBe("space Between Capitalize")
})
