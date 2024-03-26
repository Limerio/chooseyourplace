import { render, screen } from "@/utils/test"
import { describe, expect, it } from "vitest"
import { Loading } from "./Loading"

describe("Loading component", () => {
	it("Loading component english when isLoading = true", async () => {
		await render(<Loading isLoading={true}>Hello</Loading>)

		const title = await screen.findByText("Loading...")
		expect(title).toBeInTheDocument()
	})

	it("Loading component french when isLoading = true", async () => {
		await render(<Loading isLoading={true}>Bonjour</Loading>, {
			locale: "fr",
		})

		const title = await screen.findByText("Chargement...")
		expect(title).toBeInTheDocument()
	})

	it("Loading component english when isLoading = false", async () => {
		await render(<Loading isLoading={false}>Hello</Loading>)

		const title = await screen.findByText("Hello")
		expect(title).toBeInTheDocument()
	})

	it("Loading component french when isLoading = false", async () => {
		await render(<Loading isLoading={false}>Bonjour</Loading>, {
			locale: "fr",
		})

		const title = await screen.findByText("Bonjour")
		expect(title).toBeInTheDocument()
	})
})
