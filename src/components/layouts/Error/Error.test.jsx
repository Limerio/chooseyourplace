import { render } from "@/utils/test"
import { describe, expect, it } from "vitest"
import { Error } from "./Error"

describe("Error component", () => {
	it("Error english version", async () => {
		const { findByText } = await render(<Error isError={true}>Hello</Error>)
		const textError = await findByText("Internal Server Error")
		expect(textError).toBeDefined()
	})

	it("Error french version", async () => {
		const { findByText } = await render(<Error isError={true}>Bonjour</Error>, {
			lang: "fr",
		})
		const textError = await findByText("Erreur du serveur")
		expect(textError).toBeDefined()
	})
})
