import { render, screen } from "@/utils/test"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { MenuTheme } from "./MenuTheme"

describe("MenuTheme component", () => {
	it("MenuTheme component english", async () => {
		const user = userEvent.setup()
		await render(<MenuTheme />)

		await user.click(screen.getByRole("button", { name: /Toggle theme/u }))

		const darkTheme = await screen.findByText("Dark")
		expect(darkTheme).toBeInTheDocument()

		const lightTheme = await screen.findByText("Light")
		expect(lightTheme).toBeInTheDocument()

		const systemTheme = await screen.findByText("System")
		expect(systemTheme).toBeInTheDocument()
	})

	it("MenuTheme component french", async () => {
		const user = userEvent.setup()
		await render(<MenuTheme />, {
			locale: "fr",
		})

		await user.click(
			screen.getByRole("button", { name: /Changement de thème/u }),
		)

		const darkTheme = await screen.findByText("Sombre")
		expect(darkTheme).toBeInTheDocument()

		const lightTheme = await screen.findByText("Clair")
		expect(lightTheme).toBeInTheDocument()

		const systemTheme = await screen.findByText("Système")
		expect(systemTheme).toBeInTheDocument()
	})
})
