import { render, screen } from "@/utils/test"
import { describe, expect, it } from "vitest"
import { ErrorHandler } from "./Error"

describe("ErrorHandler component", () => {
	it("ErrorHandler component english when isError = true", async () => {
		await render(<ErrorHandler isError={true}>Hello</ErrorHandler>)

		const title = await screen.findByText("Internal Server Error")
		expect(title).toBeInTheDocument()
	})

	it("ErrorHandler component french when isError = true", async () => {
		await render(<ErrorHandler isError={true}>Bonjour</ErrorHandler>, {
			locale: "fr",
		})

		const title = await screen.findByText("Erreur du serveur")
		expect(title).toBeInTheDocument()
	})

	it("ErrorHandler component english when isError = false", async () => {
		await render(<ErrorHandler isError={false}>Hello</ErrorHandler>)

		const title = await screen.findByText("Hello")
		expect(title).toBeInTheDocument()
	})

	it("ErrorHandler component french when isError = false", async () => {
		await render(<ErrorHandler isError={false}>Bonjour</ErrorHandler>, {
			locale: "fr",
		})

		const title = await screen.findByText("Bonjour")
		expect(title).toBeInTheDocument()
	})
})
