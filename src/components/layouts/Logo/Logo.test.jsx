import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"
import { Logo } from "./Logo"

describe("Logo component", () => {
	afterEach(() => {
		cleanup()
	})

	it("Check title", () => {
		render(<Logo />)

		const title = screen.getByText("Chooseyourplace")
		expect(title).toBeDefined()
	})
})
