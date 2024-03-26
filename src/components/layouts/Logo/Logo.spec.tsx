import { Logo } from "@/components/layouts/Logo"
import { render, screen } from "@/utils/test"
import { beforeEach, describe, expect, it } from "vitest"

describe("Logo component", () => {
	beforeEach(async () => {
		await render(<Logo />)
	})

	it("Logo title not selectable", async () => {
		const title = await screen.findByText("Chooseyourplace")
		expect(title).toBeInTheDocument()
		expect(title).toHaveClass("select-none")
	})

	it("Logo icon", async () => {
		const icon = await screen.findByTitle("plane-icon")
		expect(icon).toBeInTheDocument()
	})
})
